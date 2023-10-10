import { fromJS, List, Map } from 'immutable';
import { INVENTORY_TYPE, PROFILE_TYPE } from '../Constants/constants';
import PricingUtils from './pricingUtils';
import AMBooking from '../Models/AMBooking/booking';
import AMBookingDetails from '../Models/AMBooking/bookingDetails';
import AMBookable from '../Models/AMBooking/bookable';
import AMPeopleProfile from '../Models/AMBooking/peopleProfile';
import AMPersonProfile from '../Models/AMBooking/personProfile';
import BookingUtils from './bookingUtils';
import DateUtils from './dateUtils';
import { getBreakup, getDiscount, getPricePayable } from './breakupUtils';
import ArrayUtils from './arrayUtils';
import { getSmartLookUrl } from './smartLookUtils';
import StringUtils from './stringUtils';
import { strings } from '../Constants/strings';

class SeatmapUtils {
	static getAMPeopleProfile({ groupSize, seatMapInfo }) {
		const type =
			groupSize > 0 ? PROFILE_TYPE.PER_GROUP : PROFILE_TYPE.PER_PERSON;
		const groupProfile = BookingUtils.getAMGroupProfile(groupSize);
		const personProfiles = new List([
			new AMPersonProfile(
				fromJS({
					type: 'ADULT',
					people: seatMapInfo.size,
					prices: seatMapInfo ? seatMapInfo.map(x => x.price) : null,
				}),
			),
		]);
		return new AMPeopleProfile(
			fromJS({
				type,
				personProfiles,
				groupProfile,
			}),
		);
	}

	static getBookables(seatMapInfo) {
		if (seatMapInfo) {
			return seatMapInfo.map(
				seatInfo =>
					new AMBookable({
						bookableId: seatInfo.id,
						count: 1,
						unitPrice: seatInfo.price,
					}),
			);
		}
		return null;
	}

	static getAMBookingDetails({
		pricing,
		booking,
		applyingPromo = false,
		comment,
	}) {
		const {
			id,
			selectedDate,
			selectedTime,
			selectedTourId,
			groupSize,
			promoObject,
			seatMapInfo,
			itineraryComment,
		} = booking;
		const appliedPromoCode =
			applyingPromo && promoObject && promoObject.get('isApplied')
				? promoObject.get('appliedPromoCode')
				: null;
		const couponCode =
			applyingPromo && promoObject
				? promoObject.get('promoCode')
				: appliedPromoCode;
		const peopleProfile = this.getAMPeopleProfile({
			groupSize,
			seatMapInfo,
		});

		const inventory = PricingUtils.getAvailableInventory(
			{ date: selectedDate, time: selectedTime, tourId: selectedTourId },
			pricing,
		);
		const calipsoPriceProfileHid = inventory.getIn([
			'finalPriceProfile',
			'hid',
		]);
		const filteredTour = pricing
			.get('tours')
			.filter(tour => tour.get('id') === selectedTourId);
		const tourHid = filteredTour.getIn([0, 'hid']);
		const pricePayable = Number(getPricePayable(getBreakup(booking)));
		const bookables = this.getBookables(seatMapInfo);
		const clientLanguage = booking.get('language');
		const clientCurrency = pricing.getIn(['currency', 'code']);
		const billableValue = booking.getIn([
			'breakup',
			'billablePrice',
			'value',
		]);

		return new AMBookingDetails({
			comment: `sl=${getSmartLookUrl() || ''} ${comment}`,
			inventoryDate: selectedDate,
			inventoryTime: selectedTime,
			calipsoPriceProfileHid,
			tourGroupId: id,
			tourId: selectedTourId,
			tourHid,
			peopleProfile,
			couponCode,
			pricePayable,
			seatInfos: seatMapInfo,
			bookables,
			clientCurrency,
			clientLanguage,
			billableValue,
			itineraryComment,
		});
	}

	static getAMBooking({
		pricing,
		booking,
		paymentInfo,
		comment,
		paymentGateway,
	}) {
		const amListBookingUserFields = BookingUtils.getAMCustomerUser({
			booking,
		});
		const amPaymentDetails = BookingUtils.getAMPaymentDetails({
			paymentInfo,
		});
		const amBookingDetails = SeatmapUtils.getAMBookingDetails({
			pricing,
			booking,
			comment,
			applyingPromo: true,
		});
		return new AMBooking({
			bookingDetails: amBookingDetails,
			paymentDetails: amPaymentDetails,
			listBookingUserFields: amListBookingUserFields,
			usingTouroxyWalletPay: true,
			paymentGatewayCode: paymentGateway,
		});
	}

	static getNetPricePayable({
		booking,
		deductPromoCodeDiscount = true,
		walletCredits = 0,
	}) {
		const { seatMapInfo, breakup } = booking;
		let totalPrice = 0;
		seatMapInfo.forEach(seatInfo => {
			totalPrice += seatInfo.price;
		});

		const promoDiscount = getDiscount(breakup);
		if (deductPromoCodeDiscount && promoDiscount) {
			totalPrice -= promoDiscount;
		}
		totalPrice = Math.max(totalPrice - walletCredits, 0);

		return totalPrice;
	}

	/**
	 * @param booking
	 * @returns {Array} [{number: 2, type: ADULT, price: 80.50},...] or [{number: 3, type: Tickets, price: 200}]
	 */
	static getPricesWithSelections(booking) {
		const { seatMapInfo } = booking;
		let pricesWithSelections = new List();

		seatMapInfo
			.groupBy(
				x => new Map({ price: x.price, seatSection: x.seatSection }),
			)
			.forEach((seatInfos, map) => {
				pricesWithSelections = pricesWithSelections.push({
					number: seatInfos.size,
					type: `${map.get('seatSection')} ${
						seatInfos.size > 1 ? 'seats' : 'seat'
					}`,
					price: map.get('price'),
					originalPrice: map.get('price'),
				});
			});
		return pricesWithSelections.toArray();
	}

	static getSlotDescription(booking, pricing) {
		const { selectedDate, selectedTime } = booking;
		const dateTime = DateUtils.localDateTimetoJSDate(
			selectedDate,
			selectedTime,
		);
		const date = DateUtils.format(dateTime, 'd mmm, dddd');
		const time = DateUtils.format(dateTime, 'h:MM tt');
		const tourId = booking.get('selectedTourId');

		// Handle case of embedded seatmaps - no variant is selected.
		if (!tourId) {
			return time ? `${date}, ${time}` : `${date}`;
		}
		const tour = PricingUtils.getTour(pricing, tourId);
		const inventoryType = tour.get('inventoryType');
		const isFixedStart =
			inventoryType === INVENTORY_TYPE.FIXED_START_FIXED_DURATION ||
			inventoryType === INVENTORY_TYPE.FIXED_START_FLEXIBLE_DURATION;

		return isFixedStart ? `${date},   ${time}` : `${date}`;
	}

	static getTicketDescription(booking, _pricing) {
		const { seatMapInfo } = booking;
		let seatsList = '';
		seatMapInfo
			.groupBy(x => x.seatSection)
			.forEach((seatInfos, seatSection) => {
				seatsList = seatsList.concat(
					StringUtils.capitalizeFirstLetter(seatSection),
					seatInfos
						.map(x => ''.concat(' ', x.seatRow, x.seatNumber))
						.join(','),
					'   ',
				);
			});

		return `${seatsList}`;
	}

	/**
	 * @param booking
	 * @returns string 2 Adult, 1 Child or 3 tickets
	 */
	static getPeopleDescription(booking) {
		const { seatMapInfo } = booking;
		const numPeople = seatMapInfo.size;
		return `${numPeople} ${numPeople > 1 ? 'Adults' : 'Adult'}`;
	}

	static filterSeatMapBySlot({ availableSeatsMap, date, time, tourId }) {
		if (availableSeatsMap && availableSeatsMap.has(date)) {
			const seatMapData = availableSeatsMap.getIn([date, 'data']);
			return seatMapData.filter(item => {
				const hasAvailableSeats = item.get('availableSeats')
					? item.get('availableSeats').size
					: false;
				if (time) {
					return (
						hasAvailableSeats &&
						item.get('tourId') === tourId &&
						item.get('startTime') === time
					);
				}
				return hasAvailableSeats && item.get('tourId') === tourId;
			});
		}
		return new List();
	}

	static getAvailableTourId({ time, date }, pricing) {
		return pricing
			.get('inventoryList')
			.filter(x => x.get('startDate') === date)
			.filter(x => x.get('startTime') === time)
			.first()
			.get('tourId');
	}

	static getSeatDetails({ availableSeatsMap, nPeople, date, time, tourId }) {
		const filteredSeats = SeatmapUtils.filterSeatMapBySlot({
			availableSeatsMap,
			date,
			time,
			tourId,
		}).first();
		if (!filteredSeats) {
			return '';
		}
		const availableSeats = filteredSeats.get('availableSeats');
		const groupedRows = availableSeats.groupBy(x => x.get('rowName'));
		let index = 0;
		const validRow = groupedRows.find(items => {
			const {
				beginIndex,
				maxCount,
			} = ArrayUtils.getMaxSubarrayIncreasingByN(
				1,
				items.map(item => item.get('rowNumber')),
			);
			if (maxCount >= nPeople) {
				index = beginIndex;
				return true;
			}
			return false;
		});
		if (validRow) {
			return validRow
				.slice(index, index + nPeople)
				.map(item => item.get('code'))
				.join();
		}
		return availableSeats
			.slice(0, Math.min(nPeople, availableSeats.size))
			.map(item => item.get('code'))
			.join();
	}

	static getStructuredSelectedSeats = seatsInfo => {
		const structuredSelectedSeats = [];
		seatsInfo.forEach(seat => {
			structuredSelectedSeats.push(seat.id);
		});
		return structuredSelectedSeats;
	};

	static getGroupedSelectedSeats = seatsInfo => {
		let groupedSelectedSeats = new Map({});
		seatsInfo.forEach(seat => {
			groupedSelectedSeats = groupedSelectedSeats.set(seat, 1);
		});
		return groupedSelectedSeats.toJS();
	};

	static getSeatSelectionInfo = seatsSelected => {
		return seatsSelected.length > 0
			? strings.formatString(
					strings.VPSM_SEATS_SELECTED[
						seatsSelected.length > 1 ? 'PLURAL' : 'SINGLE'
					],
					seatsSelected.length,
			  )
			: strings.VPSM_YOUR_SEATS;
	};

	static getSeatSelectionValidationData = validationData => {
		const { invalidBookableList } = validationData;
		const invalidSeatReasonMap = {};
		invalidBookableList.forEach(invalidSeatData => {
			const bookableIds = invalidSeatData.invalidBookableIds;
			const unvalidityReason = invalidSeatData.bookableInvalidityReason;
			const priority = invalidSeatData.priority;
			bookableIds.forEach(seat => {
				if (
					!invalidSeatReasonMap[seat] ||
					invalidSeatReasonMap[seat].priority > priority
				) {
					invalidSeatReasonMap[seat] = {
						unvalidityReason,
						priority,
					};
				}
			});
		});
		return {
			seatsSelectionValidationInfo: invalidSeatReasonMap,
			isSelectedSeatsValid: invalidBookableList.length === 0,
		};
	};

	static getOrderedSeatSelection = (seats, validationData) => {
		if (!validationData || (validationData && validationData.size === 0))
			return seats;
		const invalidSeats = Object.keys(validationData.toJS());
		seats.sort((x, y) => {
			if (invalidSeats.includes(x.id) && invalidSeats.includes(y.id)) {
				return 0;
			} else if (
				invalidSeats.includes(x.id) &&
				!invalidSeats.includes(y.id)
			) {
				return -1;
			} else if (
				!invalidSeats.includes(x.id) &&
				invalidSeats.includes(y.id)
			) {
				return 1;
			}
			return 0;
		});
		return seats;
	};
}

export default SeatmapUtils;
