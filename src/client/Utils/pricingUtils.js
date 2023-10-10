import { fromJS, List, Map } from 'immutable';
import DateUtils from './dateUtils';
import ConciergeUtils from './conciergeUtils';
import {
	AVAILABILITY_TYPE,
	INVENTORY_TYPE,
	PROFILE_TYPE,
} from '../Constants/constants';
import PriceTag from '../Models/priceTag';
import { EN } from '../Static/labels/english';
import { strings } from '../Constants/strings';
import Gen from '../Utils/gen';

class PricingUtils {
	static getAvailableDates({ inventoryList }) {
		return inventoryList
			.map(inventory => inventory.get('startDate'))
			.toOrderedSet();
	}

	static getDistinctTimes(inventories, { date, tourId }) {
		const pushIfDistinct = (distinctTimes, time) => {
			if (distinctTimes.indexOf(time) === -1) {
				distinctTimes.push(time);
			}
			return distinctTimes;
		};
		return new List(
			inventories
				.filter(inv => (date ? inv.get('startDate') === date : true))
				.filter(inv => (tourId ? inv.get('tourId') === tourId : true))
				.map(inv => inv.get('startTime'))
				.sort(
					(a, b) =>
						DateUtils.localDateTimetoJSDate('2001-01-01', a) -
						DateUtils.localDateTimetoJSDate('2001-01-01', b),
				)
				.reduce(pushIfDistinct, []),
		);
	}

	static getTour(pricing, tourId) {
		return pricing.get('tours').find(tour => tour.get('id') === tourId);
	}

	static isTourFixedStart(pricing, tourId) {
		const inventoryType = PricingUtils.getTour(pricing, tourId).get(
			'inventoryType',
		);
		return (
			inventoryType === INVENTORY_TYPE.FIXED_START_FIXED_DURATION ||
			inventoryType === INVENTORY_TYPE.FIXED_START_FLEXIBLE_DURATION
		);
	}

	static filterInventoriesByDate(inventories, date) {
		return inventories.filter(x => x.get('startDate') === date);
	}

	static filterInventoriesByTime(pricing, inventories, time) {
		return inventories.filter(
			x =>
				!PricingUtils.isTourFixedStart(pricing, x.get('tourId')) ||
				x.get('startTime') === time,
		);
	}

	static filterInventoriesByTourId(inventories, tourId) {
		return inventories.filter(x => x.get('tourId') === tourId);
	}

	static getInventoriesForTuple({ date, time, tourId }, pricing) {
		let inventories = pricing.get('inventoryList');
		inventories =
			tourId !== null
				? PricingUtils.filterInventoriesByTourId(inventories, tourId)
				: inventories;
		inventories =
			date !== null
				? PricingUtils.filterInventoriesByDate(inventories, date)
				: inventories;
		inventories =
			time !== null
				? PricingUtils.filterInventoriesByTime(
						pricing,
						inventories,
						time,
				  )
				: inventories;
		if (inventories.size === 0) {
			return null;
		}
		return inventories;
	}

	static getInventoryWithMinPrice(inventories) {
		return inventories.minBy(x =>
			PricingUtils.getListingPriceFromPriceProfile(
				x.get('finalPriceProfile'),
			),
		);
	}

	static getAvailableInventory({ date, time, tourId }, pricing) {
		const filteredInventories = pricing
			.get('inventoryList')
			.filter(inv => tourId === null || inv.get('tourId') === tourId)
			.filter(inv => date === null || inv.get('startDate') === date)
			.filter(
				inv =>
					time === null ||
					!PricingUtils.isTourFixedStart(
						pricing,
						inv.get('tourId'),
					) ||
					inv.get('startTime') === time,
			);
		if (filteredInventories.size > 0) {
			return filteredInventories.first();
		}
		return null;
	}

	static getMinMaxPax(inventory, pricing, cookies) {
		const { tourId, availability, remaining } = inventory;
		const tour = PricingUtils.getTour(pricing, tourId);
		const { minPax } = tour;

		const isAffiliate = ConciergeUtils.isAffiliate(cookies);
		let maxPax = isAffiliate
			? Math.max(minPax + 29, minPax * 2)
			: Math.max(minPax + 19, minPax * 2);
		if (availability === AVAILABILITY_TYPE.LIMITED) {
			maxPax = Math.min(maxPax, remaining);
		}

		// NOTE: 10 is the default max-pax in suppliers
		if (tour.get('maxPax') && tour.get('maxPax') < 20) {
			maxPax = Math.min(maxPax, tour.get('maxPax'));
		}
		return { minPax, maxPax };
	}

	static getMinPax(inventory, pricing) {
		const { tourId } = inventory;
		const tour = PricingUtils.getTour(pricing, tourId);
		const { minPax } = tour;
		return minPax;
	}

	static getPeopleSelectionsFromProduct(inventory, pricing) {
		const priceProfileFromInventory = inventory.get('finalPriceProfile');
		let selectionMap = new Map({});
		let groupSize = 0;
		for (const person of priceProfileFromInventory.get('persons')) {
			selectionMap = selectionMap.set(
				person.get('type').toUpperCase(),
				0,
			);
		}

		const minPax = PricingUtils.getMinPax(inventory, pricing);
		if (priceProfileFromInventory.get('type') === PROFILE_TYPE.PER_PERSON) {
			const firstKey = selectionMap.keySeq().first();
			selectionMap = selectionMap.set(firstKey, minPax);
		} else if (
			priceProfileFromInventory.get('type') === PROFILE_TYPE.PER_GROUP
		) {
			groupSize = minPax;
		}

		return { selectionMap, groupSize };
	}

	static getListingPriceFromPriceProfile(priceProfile) {
		if (priceProfile.get('type') === PROFILE_TYPE.PER_PERSON) {
			return priceProfile
				.get('persons')
				.first()
				.get('price');
		}
		return priceProfile
			.get('groups')
			.first()
			.get('price');
	}

	static getListingPriceFromInventory(inventory) {
		if (!inventory) return null;
		return PricingUtils.getListingPriceFromPriceProfile(
			inventory.get('finalPriceProfile'),
		);
	}

	static getPriceTag(inventory, priceProfileMap, currency) {
		if (!inventory) return null;
		const priceProfile = inventory.get('finalPriceProfile');
		const originalPriceProfile = priceProfileMap.get(
			String(inventory.get('originalPriceProfileId')),
		);
		const price = PricingUtils.getListingPriceFromPriceProfile(
			priceProfile,
		);
		const originalPrice = PricingUtils.getListingPriceFromPriceProfile(
			originalPriceProfile,
		);
		const discount = originalPrice > price ? originalPrice - price : 0;
		const discountInPercent = discount
			? (discount / originalPrice) * 100
			: 0;
		return new PriceTag(
			fromJS({
				price,
				originalPrice,
				discount,
				discountInPercent,
				currency,
			}),
		);
	}

	static getMinPriceTag(inventories, priceProfileMap, currency) {
		if (!inventories || inventories.size === 0) return null;

		const minPriceInventory = PricingUtils.getInventoryWithMinPrice(
			inventories,
		);
		return PricingUtils.getPriceTag(
			minPriceInventory,
			priceProfileMap,
			currency,
		);
	}

	static getStructuredTimeList = (timeSlots, pricing, isSeatMap) => {
		const { currency, priceProfileMap } = pricing;
		const structuredTimeSlots = [];
		timeSlots.forEach(inventory => {
			const { price, originalPrice } = PricingUtils.getPriceTag(
				inventory,
				priceProfileMap,
				currency,
			);
			const { availability, remaining } = inventory;
			const isBoosters =
				availability === 'LIMITED' && remaining < 10 && remaining > 0;
			let boostersTextSeatmap = null;
			let boostersText = null;
			if (isBoosters) {
				boostersTextSeatmap = EN.VPVI_SELLING_FAST;
				boostersText =
					remaining === 1
						? EN.VPVI_TICKET_LEFT
						: strings.formatString(EN.VPVI_TICKETS_LEFT, remaining);
			}
			const timeSlot = inventory.get('startTime');
			structuredTimeSlots.push({
				timeSlot,
				availability: true,
				netPrice: Gen.formatPrice(price, currency),
				originalPrice: Gen.formatPrice(originalPrice, currency),
				boosters: isSeatMap ? boostersTextSeatmap : boostersText,
			});
		});
		return fromJS(structuredTimeSlots)
			.groupBy(x => x.get('timeSlot'))
			.toJS();
	};

	static getPaxPriceDetails = (selectionMap, finalPriceProfile) => {
		const paxPriceDetails = [];
		Object.keys(selectionMap.toJS()).forEach(pax => {
			let pricePerPax = null;
			finalPriceProfile.get('persons').forEach(paxDetails => {
				if (paxDetails.get('type') === pax) {
					pricePerPax = paxDetails.get('price');
				}
			});
			paxPriceDetails.push({
				type: pax,
				price: pricePerPax,
				count: selectionMap.get(pax),
			});
		});
		return paxPriceDetails;
	};
}

export default PricingUtils;
