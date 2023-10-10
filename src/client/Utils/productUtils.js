import { fromJS, List, Map } from 'immutable';
import {
	ACTIVE_LANGUAGE_CODES,
	DESCRIPTOR_MAP,
	FLEXIBLE_START_TIME,
	PROFILE_TYPE,
	TOUR_TYPE,
} from '../Constants/constants';
import Gen from './gen';
import DateUtils from './dateUtils';
import { strings } from '../Constants/strings';
import { getFlexiTours, isSeatmap } from './bookingFlowUtils';
import BookingUtils from './bookingUtils';
import PricingUtils from './pricingUtils';
import { getExtraChargesList } from './breakupUtils';
import { isAffiliate } from '../Utils/conciergeUtils';
import { getBaseUrl, getWebPathString } from '../Utils/urlUtils';

class ProductUtils {
	static getCashbackAmount(product) {
		const { listingPrice } = product;
		if (!listingPrice) return null;
		const { cashbackValue, cashbackType } = listingPrice;
		if (cashbackValue && cashbackValue > 0) {
			if (cashbackType === 'ABSOLUTE') {
				const { currency } = product;
				const priceAsString = Gen.formatPrice(cashbackValue, currency);
				return `${priceAsString}`;
			} else if (cashbackType === 'PERCENTAGE') {
				return `${cashbackValue}%`;
			}
		}
		return null;
	}

	static getAddressAsString(product) {
		if (!product) {
			return '';
		}
		const { startLocation } = product;
		const { addressLine1, addressLine2, cityName } = startLocation;
		const addressLines = [];

		if (addressLine1) addressLines.push(addressLine1);
		if (addressLine2) addressLines.push(addressLine2);
		if (cityName) addressLines.push(cityName);

		return addressLines.join(', ');
	}

	static getCanonicalURL({
		product,
		paramLang,
		relative = false,
		isAmp = false,
	}) {
		if (!product) return null;
		const productUrl = product.get('url');
		const canonicalUrl = product.get('canonicalUrl');
		const langPrefix =
			paramLang && paramLang.toUpperCase() !== 'EN'
				? `/${paramLang}`
				: '';
		const ampPrefix = isAmp ? '/amp' : '';
		return `${
			relative ? '' : getBaseUrl()
		}${ampPrefix}${langPrefix}${canonicalUrl || productUrl}`;
	}

	static getAlternateURL({
		product,
		paramLang,
		relative = false,
		isAmp = false,
	}) {
		if (!product) return null;
		const productUrl = product.get('url');
		const canonicalUrl = product.get('canonicalUrl');
		const langPrefix =
			paramLang && paramLang.toUpperCase() !== 'EN'
				? `/${paramLang.toLowerCase()}`
				: '';
		const ampPrefix = isAmp ? '/amp' : '';
		return `${
			relative ? '' : getBaseUrl()
		}${ampPrefix}${langPrefix}${canonicalUrl || productUrl}`;
	}

	static isNoIndex({ product, paramLang }) {
		if (!product) return false;
		if (paramLang) {
			if (paramLang.toUpperCase() === 'EN') return true;
			if (
				product.get('language').toUpperCase() !==
				paramLang.toUpperCase()
			) {
				return true;
			}
		}
		return product.get('noIndex');
	}

	static getProductCardClickAmpUrl(productCard) {
		const { tourGroupUrl } = productCard;
		return `/amp${tourGroupUrl}`;
	}

	static isBroadwayProduct(productCard) {
		const { allTags } = productCard;
		return allTags.filter(x => x.includes('BROAD')).size > 0;
	}

	static getProductCardClickUrl({
		productCard,
		paramLang,
		withBase = false,
	}) {
		const { tourGroupUrl } = productCard;
		const bookingPageUrl = tourGroupUrl.replace(/\/tour\//, '/book/');
		if (ProductUtils.isOneTimeEvent(productCard)) {
			return bookingPageUrl;
		}
		const langPrefix = paramLang ? `/${paramLang}` : '';
		return `${withBase ? getBaseUrl() : ''}${langPrefix}${tourGroupUrl}`;
	}

	static getReviewsPageUrl({ product, paramLang, withBase = false }) {
		if (!product) return null;
		const langPrefix = paramLang ? `/${paramLang}` : '';
		return `${withBase ? getBaseUrl() : ''}${langPrefix}${product
			.get('url')
			.replace(/\/tour\//, '/reviews/')}`;
	}

	static getSiteMapMetaData({ product, lang = 'en', slots }) {
		const {
			id: sku,
			name,
			imageUploads: image,
			summary: description,
			categoriesFromRoot,
			city,
			listingPrice,
			reviewsDetails,
			topReviews,
		} = product;
		const imageUrl = image.size
			? `https:${image.getIn([
					'0',
					'url',
			  ])}?auto=compress&w=768&h=480&fit=min`
			: '';
		const descriptionString = Gen.htmlToString(description);
		let metaData = null;
		if (listingPrice) {
			metaData = {
				'@context': 'http://www.schema.org',
				'@type': 'Product',
				url: ProductUtils.getCanonicalURL({ product, paramLang: lang }),
				brand: {
					'@type': 'Thing',
					name: 'Touroxy',
				},
				name,
				image: imageUrl,
				description: descriptionString,
				sku,
				productID: sku,
				offers: ProductUtils.getOffersSchema({ product, lang }),
			};

			// Adding AggregateRating as a part of StructuredData
			if (reviewsDetails) {
				const {
					reviewsCount,
					averageRating,
					ratingsCount,
				} = reviewsDetails;
				if (reviewsCount || averageRating || ratingsCount) {
					metaData.aggregateRating = {
						'@type': 'AggregateRating',
						bestRating: 5,
						worstRating: 1,
						...(averageRating && { ratingValue: averageRating }),
						...(ratingsCount && { ratingCount: ratingsCount }),
						...(reviewsCount && { reviewCount: reviewsCount }),
					};
				}
			}
			// Adding Reviews as a part of StructuredData
			if (topReviews) {
				const reviewSchemaData = ProductUtils.getReviewsSchema({
					topReviews,
					name,
				});
				metaData.reviews = reviewSchemaData;
			}
		}
		const breadcrumbData = {
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					item: {
						'@id': `${getBaseUrl()}/cities/${getWebPathString(
							city.get('code'),
						)}`,
						name: city.get('displayName'),
						image: city.get('imageUrl'),
					},
				},
			].concat(
				categoriesFromRoot
					.map((category, index) => ({
						'@type': 'ListItem',
						position: index + 2, // start from 2 here since cityName is at pos. 1
						item: {
							'@id': `${getBaseUrl()}/category/${category.get(
								'id',
							)}/${category.get('urlSlug')}`,
							name: category.get('displayName'),
							image: `https:${category.get('cardImageUrl')}`,
						},
					}))
					.toJS(),
			),
		};

		const eventData =
			slots.get('slots') && slots.get('slots').size
				? slots
						.get('slots')
						.take(10)
						.map(inv => ({
							'@context': 'https://schema.org',
							'@type': 'Event',
							name,
							startDate: `${inv.get('startDate')}T${inv.get(
								'startTime',
							)}`,
							location: ProductUtils.getLocationSchema(product),
							image: imageUrl,
							endDate: `${inv.get('startDate')}T${inv.get(
								'endTime',
							)}`,
							description: `Book ${name} tickets for ${DateUtils.getHumanReadableDateTime(
								inv,
							)}`,
							performer: {
								'@type': 'PerformingGroup',
								name,
							},
							offers: {
								'@type': 'Offer',
								url: `${getBaseUrl()}/tour/${sku}?date=${inv.get(
									'startDate',
								)}&time=${inv.get('startTime')}`,
								price: listingPrice
									? listingPrice.get('finalPrice')
									: null,
								priceCurrency: listingPrice
									? listingPrice.get('currencyCode')
									: null,
								availability: listingPrice
									? 'http://schema.org/InStock'
									: 'http://schema.org/OutOfStock',
								itemCondition: 'http://schema.org/NewCondition',
								validFrom: '2017-01-20T16:20-08:00',
							},
						}))
						.toJS()
				: [];

		return [metaData, breadcrumbData, ...eventData].filter(data => data);
	}

	static getLocationSchema(product) {
		const { startLocation } = product;
		const {
			addressLine1,
			addressLine2,
			postalCode,
			state,
			countryCode,
		} = startLocation;

		return {
			'@type': 'Place',
			name: addressLine1,
			address: {
				'@type': 'PostalAddress',
				streetAddress: addressLine1,
				addressLocality: addressLine2,
				postalCode,
				addressRegion: state,
				addressCountry: countryCode,
			},
		};
	}

	static getOffersSchema({ product, lang = 'en' }) {
		const { listingPrice } = product;
		if (!listingPrice) {
			return null;
		}
		return {
			'@type': 'Offer',
			price: listingPrice.get('finalPrice'),
			priceCurrency: listingPrice.get('currencyCode'),
			availability: 'http://schema.org/InStock',
			itemCondition: 'http://schema.org/NewCondition',
			url: ProductUtils.getCanonicalURL({ product, paramLang: lang }),
		};
	}

	static getReviewsSchema = ({ topReviews, name }) => {
		if (!topReviews) return null;
		const reviewsSchema = [];
		topReviews.forEach(reviewDetails => {
			reviewsSchema.push(
				ProductUtils.getIndiviualReviewSchema(reviewDetails, name),
			);
		});
		return reviewsSchema;
	};

	static getIndiviualReviewSchema = (reviewDetails, name) => {
		const { nonCustomerName, rating, reviewTime, content } = reviewDetails;
		return {
			'@type': 'Review',
			author: nonCustomerName,
			datePublished: DateUtils.format(reviewTime, 'mmmm, yyyy'),
			description: content,
			name,
			reviewRating: {
				'@type': 'Rating',
				bestRating: 5,
				ratingValue: rating,
				worstRating: 1,
			},
		};
	};

	static getProductPageTitle(product) {
		if (!product) return null;
		const { metaTitle, name, city } = product;
		if (metaTitle) {
			return metaTitle;
		}
		const titles = List.of(
			`${name} ${city.get('displayName')} | ${strings.TICKETS}, ${
				strings.TOURS
			} & ${strings.DEALS} | Touroxy`,
			`${name} ${city.get('displayName')} | ${strings.TICKETS} & ${
				strings.TOURS
			} | Touroxy`,
			`${name} ${city.get('displayName')} ${strings.TICKETS} | Touroxy`,
			`${name} ${city.get('displayName')} | Touroxy`,
			`${name} | Touroxy`,
		);
		return titles.find(x => x.length < 70) || titles.last();
	}

	static getProductMetaDescription(product) {
		if (!product) return null;
		const { name, city } = product;
		return (
			product.get('metaDescription') ||
			strings.formatString(
				strings.PRODUCT_META_DESCRIPTION,
				name,
				city.get('displayName'),
			)
		);
	}

	static getProductMetaTags({ product, isAmp = false }) {
		if (!product) return null;
		const { listingPrice, name, displayTags } = product;
		let tags = [
			'<meta property="og:site_name" content="Touroxy" />',
			'<meta property="og:type" content="product" />',
			`<meta property="og:url" content="${ProductUtils.getCanonicalURL({
				product,
				isAmp,
			})}" />`,
			`<meta property="og:description" content="${ProductUtils.getProductMetaDescription(
				product,
			)}" />`,
			`<meta name="twitter:description" content="${ProductUtils.getProductMetaDescription(
				product,
			)}" />`,
			`<meta property="og:title" content="${ProductUtils.getProductPageTitle(
				product,
			)}" />`,
			`<meta property="twitter:title" content="${ProductUtils.getProductPageTitle(
				product,
			)}" />`,
			'<meta name="twitter:card" content="summary_large_image" />',
			'<meta name="twitter:site" content="@touroxy" />',
			`<meta property="og:availability" content="${
				listingPrice ? 'instock' : 'out of stock'
			}" />`,
			`<meta property="product:availability" content="${
				listingPrice ? 'instock' : 'out of stock'
			}" />`,
			`<meta property="product:category" content="${product.getIn([
				'collection',
				'displayName',
			])}" />`,
			'<meta property="product:condition" content="new" />',
			`<meta property="og:price:amount" content="${
				listingPrice ? listingPrice.get('finalPrice') : ''
			}" />`,
			`<meta property="og:price:currency" content="${product.getIn([
				'currency',
				'code',
			])}" />`,
			`<meta property="product:price:amount" content="${
				listingPrice ? listingPrice.get('finalPrice') : ''
			}" />`,
			`<meta property="product:price:currency" content="${product.getIn([
				'currency',
				'code',
			])}" />`,
			`<meta name="keywords" content="${displayTags.join(
				', ',
			)} ${ProductUtils.getCityDisplayName(
				product,
			)}, ${name}, tickets, discount, best price, top-rated, reviews" />`, // eslint-disable-line max-len
			`<link rel="alternate" hreflang="x-default" href="${ProductUtils.getCanonicalURL(
				{ product, isAmp },
			)}" />`,
		];

		tags = tags.concat(
			ACTIVE_LANGUAGE_CODES.map(
				lang =>
					`<link rel="alternate" hreflang="${lang.toLowerCase()}" href="${ProductUtils.getAlternateURL(
						{ product, paramLang: lang, isAmp },
					)}" />`,
			),
		);

		const { imageUploads: image } = product;
		if (image.size > 0) {
			tags = tags.concat([
				`<meta property="twitter:image" content="https:${image.getIn([
					'0',
					'url',
				])}?auto=compress&w=768&h=480&fit=min" />`,
				`<meta property="og:image:url" content="https:${image.getIn([
					'0',
					'url',
				])}?auto=compress&w=768&h=480&fit=min" />`,
				`<meta property="og:image:secure_url" content="https:${image.getIn(
					['0', 'url'],
				)}?auto=compress&w=768&h=480&fit=min" />`,
				`<meta property="og:image:type" content="${ProductUtils.getCanonicalURL(
					{ product, isAmp },
				)}" />`,
				'<meta property="og:image:width" content="768" />',
				'<meta property="og:image:height" content="480" />',
				`<meta property="og:image:alt" content="${image.getIn([
					'0',
					'alt',
				])}" />`,
			]);
		}
		return tags.reduce((tag, allTags) => `${allTags} \n ${tag}`, '');
	}

	static isOneTimeEvent(product) {
		// @NOTE wrap product with Map as some function calls not passing immutable object, just plain JS object
		return product
			? new Map(product).get('allTags').indexOf(TOUR_TYPE.ONE_TIME) !== -1
			: false;
	}

	static getProductPropertiesForAnalytics(product) {
		const { id, name, listingPrice } = product;
		const properties = {
			id,
			name,
			productId: id, // Note: Ideally produtId and Name should be removed. Keeping them for backward compat reasons.
			productName: name,
			tourGroupID: id,
			tourGroupName: name,
			currency: product.getIn(['currency', 'code']),
			cityCode: ProductUtils.getTourCityCode(product),
			categoryId: product.getIn(['collection', 'id']),
			category: product.getIn(['collection', 'displayName']),
			list: product.getIn(['collection', 'displayName']),
			list_name: product.getIn(['collection', 'displayName']),
			brand: ProductUtils.getCityDisplayName(product),
		};
		// NOte: Why disable currency above?
		// hen we send an event to vero, mofo Vero sets a cookie contains same faileds as event.
		// some cyrrency symbols are not cookie safe. Hence, removing field till we get a better solution from vero's side.
		if (listingPrice) {
			const {
				finalPrice,
				originalPrice,
				bestDiscount,
				cashbackValue,
				cashbackType,
			} = listingPrice;
			Object.assign(properties, {
				price: finalPrice,
				finalPrice,
				originalPrice,
				savedPrice: originalPrice - finalPrice,
				discountPercentage: bestDiscount,
				cashbackValue,
				cashbackType,
			});
		}
		return properties;
	}

	static getProductCardPropsForAnalytics(productCard) {
		const { id, name, primaryCategory, listingPrice } = productCard;
		const properties = {
			id,
			name,
			category: primaryCategory.get('displayName'),
		};
		if (listingPrice) {
			const { finalPrice, currencyCode } = listingPrice;
			Object.assign(properties, {
				price: finalPrice,
				currency: currencyCode,
			});
		}
		return properties;
	}

	static getProductListingPriceValue(product) {
		const { listingPrice } = product;
		return listingPrice.get('finalPrice');
	}

	static getGroupedSelectedSeats = seatsInfo => {
		let groupedSelectedSeats = new Map({});
		seatsInfo.forEach(seat => {
			let seatDetails = new Map({});
			seatDetails = seatDetails.set('count', 1).set('price', seat.price);
			groupedSelectedSeats = groupedSelectedSeats.set(
				seat.id,
				seatDetails,
			);
		});
		return groupedSelectedSeats.toJS();
	};

	static getPaxDetails = ({ booking, pricing }) => {
		const { selectionMap, seatMapInfo, groupSize } = booking;
		const priceProfile = BookingUtils.getPriceProfile(pricing, booking);
		if (!priceProfile) {
			return null;
		}
		const profileType = priceProfile.get('type');
		let paxDetails;
		if (profileType === PROFILE_TYPE.PER_PERSON && !isSeatmap(pricing)) {
			paxDetails = PricingUtils.getPaxPriceDetails(
				selectionMap,
				priceProfile,
			);
		} else if (profileType === PROFILE_TYPE.PER_GROUP) {
			paxDetails = {
				groupSize,
			};
		} else {
			paxDetails = ProductUtils.getGroupedSelectedSeats(seatMapInfo);
		}
		return paxDetails;
	};

	static getStructuredFilters = filters => {
		let structuredFilter = new Map({});
		let priceFilter = new Map({});
		let timeFilter = new Map({});
		let dateFilter = new Map({});

		// structuring the price filter
		if (filters.get('filter-price-high')) {
			priceFilter = priceFilter
				.set('selected', true)
				.set('minPrice', filters.get('filter-price-low'))
				.set('maxPrice', filters.get('filter-price-high'));
		} else {
			priceFilter = priceFilter.set('selected', false);
		}

		// structuring the date filter
		if (filters.get('filter-dates[]')) {
			dateFilter = dateFilter
				.set('selected', true)
				.set('datesSelected', filters.get('filter-dates[]'));
		} else {
			dateFilter = dateFilter.set('selected', false);
		}

		// structuring the time filter
		if (filters.get('filter-times[]')) {
			timeFilter = timeFilter
				.set('selected', true)
				.set('timeSelected', filters.get('filter-times[]'));
		} else {
			timeFilter = timeFilter.set('selected', false);
		}

		structuredFilter = structuredFilter
			.set('priceFilter', priceFilter)
			.set('timeFilter', timeFilter)
			.set('dateFilter', dateFilter);
		return structuredFilter;
	};

	static getStructuredVariantList = (selectedDate, selectedTime, pricing) => {
		const {
			inventoryMap,
			inventoryMapByDateTime,
			tourMap,
			priceProfileMap,
			currency,
		} = pricing;
		const allKeys = tourMap.keySeq().toArray();
		const variantsList = [];
		if (selectedDate && selectedTime) {
			const datedInventory = inventoryMap.get(selectedDate);
			if (selectedTime === FLEXIBLE_START_TIME) {
				const flexiTours = getFlexiTours(tourMap);
				const tourIdsWithFlexibleTime = flexiTours.keySeq().toArray();
				datedInventory
					.filter(
						x =>
							tourIdsWithFlexibleTime.indexOf(
								String(x.getIn([0, 'tourId'])),
							) !== -1,
					)
					.forEach(inv => {
						const variantId = String(inv.getIn([0, 'tourId']));
						const inventoryType = tourMap.getIn([
							variantId,
							0,
							'inventoryType',
						]);
						const {
							price,
							originalPrice,
						} = PricingUtils.getPriceTag(
							inv.get(0),
							priceProfileMap,
							currency,
							inventoryType,
						);
						variantsList.push({
							id: variantId,
							availability: true,
							netPrice: Gen.formatPrice(price, currency),
							originalPrice: Gen.formatPrice(
								originalPrice,
								currency,
							),
						});
					});
			} else {
				const filteredInventoryByTime = inventoryMapByDateTime.hasIn([
					selectedDate,
					selectedTime,
				])
					? inventoryMapByDateTime.getIn([selectedDate, selectedTime])
					: new List();
				if (filteredInventoryByTime) {
					filteredInventoryByTime.forEach(inv => {
						const variantId = String(inv.get('tourId'));
						const inventoryType = tourMap.getIn([
							variantId,
							0,
							'inventoryType',
						]);
						const {
							price,
							originalPrice,
						} = PricingUtils.getPriceTag(
							inv,
							priceProfileMap,
							currency,
						);
						variantsList.push({
							id: variantId,
							availability: true,
							netPrice: Gen.formatPrice(price, currency),
							originalPrice: Gen.formatPrice(
								originalPrice,
								currency,
							),
							inventoryType,
						});
					});
				}
			}
			const availableVariantsKeys = variantsList.map(
				variant => variant.id,
			);
			const unavailableVariantsKeys = allKeys.filter(
				x => !availableVariantsKeys.includes(x),
			);
			unavailableVariantsKeys.forEach(id => {
				const variantId = String(id);
				variantsList.push({
					id: variantId,
					availability: false,
				});
			});
		}
		return fromJS(variantsList)
			.groupBy(x => x.get('id'))
			.toJS();
	};

	static getStructuredVariantListMobile = (selectedDate, pricing) => {
		const { inventoryMap, tourMap, priceProfileMap, currency } = pricing;
		const allKeys = tourMap.keySeq().toArray();
		const variantsList = [];
		if (selectedDate) {
			const datedInventory = inventoryMap.get(selectedDate);
			const availableKeys = datedInventory.keySeq().toArray();
			datedInventory
				.filter(
					x =>
						availableKeys.indexOf(
							String(x.getIn([0, 'tourId'])),
						) !== -1,
				)
				.forEach(inv => {
					const variantId = String(inv.getIn([0, 'tourId']));
					const inventoryType = tourMap.getIn([
						variantId,
						0,
						'inventoryType',
					]);
					const { price, originalPrice } = PricingUtils.getPriceTag(
						inv.get(0),
						priceProfileMap,
						currency,
					);
					variantsList.push({
						id: variantId,
						availability: true,
						netPrice: Gen.formatPrice(price, currency),
						originalPrice: Gen.formatPrice(originalPrice, currency),
						inventoryType,
					});
				});
			const availableVariantsKeys = variantsList.map(
				variant => variant.id,
			);
			const unavailableVariantsKeys = allKeys.filter(
				x => !availableVariantsKeys.includes(x),
			);
			unavailableVariantsKeys.forEach(id => {
				const variantId = String(id);
				variantsList.push({
					id: variantId,
					availability: false,
				});
			});
		}
		return fromJS(variantsList)
			.groupBy(x => x.get('id'))
			.toJS();
	};

	static getExtraCharges = breakup => {
		if (!breakup) return null;
		let extraCharges = 0;
		getExtraChargesList(breakup).forEach(item => {
			extraCharges += item.get('value');
		});
		return extraCharges;
	};

	static getProductPropertiesForConversionEvent = product => {
		const { id, name, listingPrice } = product;
		const properties = {
			id,
			name,
			productId: id, // Note: Ideally productId and productName should be removed, keeping them for backward compatibility reasons
			productName: name,
			tourGroupID: id,
			tourGroupName: name,
			currency: product.getIn(['currency', 'code']),
			cityCode: ProductUtils.getTourCityCode(product),
			categoryId: product.getIn(['collection', 'id']),
			category: product.getIn(['collection', 'displayName']),
			list: product.getIn(['collection', 'displayName']),
			list_name: product.getIn(['collection', 'displayName']),
			brand: ProductUtils.getCityDisplayName(product),
		};
		if (listingPrice) {
			const { bestDiscount, cashbackValue, cashbackType } = listingPrice;
			return {
				...properties,
				discountPercentage: bestDiscount,
				cashbackValue,
				cashbackType,
			};
		}
		return properties;
	};

	static getPrimaryCategoryId(product) {
		return product.getIn(['collection', 'id']);
	}

	static getPrimaryCategoryName(product) {
		return product.getIn(['collection', 'displayName']);
	}

	static getPrimaryImageUrl = product =>
		product.getIn(['imageUploads', 0, 'url']);

	static getTourCountryCode = product =>
		product.getIn(['city', 'country', 'code']);

	static getTourCityCode = product => product.getIn(['city', 'code']);

	static getCityDisplayName = product =>
		product.getIn(['city', 'displayName']);
}

export default ProductUtils;

export const getCashbackString = product => {
	// show max cashbackValue available
	const { listingPrice } = product;
	if (!listingPrice) return null;
	const { cashbackValue, cashbackType } = listingPrice;
	if (cashbackValue && cashbackValue > 0) {
		if (cashbackType === 'ABSOLUTE') {
			const { currency } = product;
			const priceAsString = Gen.formatPrice(cashbackValue, currency);
			return strings.formatString(strings.PPD_CASHBACK, priceAsString);
		} else if (cashbackType === 'PERCENTAGE') {
			return strings.formatString(
				strings.PPD_CASHBACK,
				`${cashbackValue}%`,
			);
		}
	}
	return null;
};

export const getDescriptorList = (product, cookies) => {
	const { flexiDate, minDuration, maxDuration, descriptors } = product;
	const cashbackText = !isAffiliate(cookies)
		? getCashbackString(product)
		: null;
	let durationText;
	if (!minDuration || !maxDuration) {
		durationText = strings.PPD_FLEXI_HOURS;
	} else {
		const durationMin = DateUtils.formatDurationToHoursMinutes(minDuration);
		const durationMax = DateUtils.formatDurationToHoursMinutes(maxDuration);
		if (minDuration === maxDuration) {
			durationText = `${durationMin}`;
		} else {
			durationText = `${durationMin} - ${durationMax}`;
		}
	}
	const flexiDateDescriptor = flexiDate
		? { icon: 'flexidate', label: strings.PPD_FLEXI_DATE }
		: null;
	const cashbackDescriptor = cashbackText
		? { icon: 'wallet', label: cashbackText }
		: null;
	const descriptorList = descriptors
		.map(descriptor => DESCRIPTOR_MAP[descriptor.get('code')])
		.toJS()
		.concat([flexiDateDescriptor, cashbackDescriptor]);
	if (descriptorList.filter(x => x).length > 0) {
		const DurationDescriptor = { icon: 'clock', label: durationText };
		descriptorList.push(DurationDescriptor);
	}
	return new List(descriptorList);
};
