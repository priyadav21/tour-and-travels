import { List, Set } from 'immutable';
import { BANNER_NON_CITY_KEY, CARD_BIN_LENGTH } from '../Constants/constants';
import { ProfileType } from '../Models/user';

/**
 * Contains access functions for common data in redux store
 * Only the data that is being accessed from multiple places
 * is intended to be here
 */
class StateUtils {
	static getHost(state) {
		return state.getIn(['deviceStore', 'host']);
	}

	static isBot(state) {
		return !!state.getIn(['deviceStore', 'isBot']) === true;
	}

	static getCurrentCityCode(state) {
		return state.getIn(['city', 'currentCityCode']);
	}

	static getCurrentCurrency(state) {
		return (
			state.getIn(['currencies', 'currentCurrencyCode']) ||
			state.getIn(['currencies', 'locationCurrencyCode'])
		);
	}

	static getCurrenciesMap(state) {
		return state.getIn(['currencies', 'currenciesMap']);
	}

	static getCurrentLanguageCode(state) {
		return state.getIn(['languageStore', 'code']) || 'en';
	}

	static getTicket(state, id) {
		const booking = state.getIn(['bookings', String(id)]);
		if (!booking) {
			return null;
		}
		const { bookingResponse } = booking;
		return state.getIn(['ticketStore', 'byId', `${bookingResponse.id}`]);
	}

	static getLanguageMap(state) {
		return state.getIn(['languageStore', 'languageMap']);
	}

	static getCurrentCity(state) {
		return state.getIn([
			'city',
			'citiesMap',
			StateUtils.getCurrentCityCode(state),
		]);
	}

	static getCitiesMap(state) {
		return state.get('city').get('citiesMap');
	}

	static getDiscoverableCityCodes(state) {
		return state.getIn(['city', 'discoverableCityCodes']);
	}

	static getCityCodes(state) {
		return state.getIn(['city', 'cityCodes']);
	}

	static getCity(state, cityCode) {
		return state.getIn(['city', 'citiesMap', cityCode]);
	}

	static getCurrentCountryCode(state) {
		return state.getIn([
			'city',
			'citiesMap',
			StateUtils.getCurrentCityCode(state),
			'country',
			'code',
		]);
	}

	static getProduct(state, id) {
		return state.getIn(['productStore', 'byId', String(id)]);
	}

	static getProductCard(state, id) {
		return state.getIn(['productStore', 'byCardId', String(id)]);
	}

	static getSlots(state, productId) {
		return (
			state.getIn(['slotsStore', 'byProductId', String(productId)]) ||
			new List()
		);
	}

	static getPricing(state, productId) {
		return state.getIn(['pricingStore', 'byProductId', String(productId)]);
	}

	static getInventoryMap(state, productId) {
		return StateUtils.getPricing(state, productId).get('inventoryMap');
	}

	static getInventory(state, productId) {
		return StateUtils.getPricing(state, productId).getIn([
			'inventoryList',
			'0',
		]);
	}

	static getInventoryStructure(state, productId) {
		return StateUtils.getPricing(state, productId).get(
			'inventoryStructure',
		);
	}

	static getBooking(state, id) {
		return state.getIn(['bookings', String(id)]);
	}

	static getItineraryProductId(state, piid) {
		const booking =
			state
				.get('bookings')
				.find(
					bookingStore =>
						bookingStore.getIn(['bookingResponse', 'secureId']) ===
						piid,
				) || state.get('bookings').first();
		return booking ? booking.get('id') : null;
	}

	static getBanners(state, params, temp) {
		const cityKey =
			StateUtils.getCurrentCityCode(state) || BANNER_NON_CITY_KEY;
		const bannersList = state.getIn([
			'banners',
			cityKey,
			params,
			'bannersList',
		]);
		if (bannersList && bannersList.size > 0) {
			return bannersList;
		}
		const isFetching = state.getIn([
			'banners',
			cityKey,
			params,
			'isFetching',
		]);
		if (isFetching) {
			return new List();
		}
		return temp || new List();
	}

	/**
	 * @param state
	 * @returns {Boolean} true if fetching, false o.w
	 */
	static getFetchingStatus(state) {
		return state.getIn(['fetchingStatus', 'isFetching']);
	}

	/**
	 * @param state
	 * @returns {string} PAGE_TYPE constant. will be undefined/null until the first page is mounted
	 */
	static getCurrentPage(state) {
		return state.getIn(['page', 'currentPage']);
	}

	/**
	 * @param state
	 * @returns {string} PAGE_TYPE constant. will be undefined/null until the second page is mounted
	 */
	static getPrevPage(state) {
		return state.getIn(['page', 'prevPage']);
	}

	static getUser(state) {
		return state.getIn(['user', 'user']);
	}

	static getResetPassword(state) {
		return state.getIn(['user', 'resetAffiliatePassword']);
	}

	static getUserLandingUrl(state) {
		return state.getIn(['user', 'user', 'landingUrl']);
	}

	static getUserProfileType(state) {
		if (state.hasIn(['user', 'profileType'])) {
			return state.getIn(['user', 'profileType']);
		}
		return ProfileType.ANONYMOUS;
	}

	static getUserFetchStatus(state) {
		return state.getIn(['user', 'isFetchingUser']);
	}

	static getPromoObject(state, id) {
		return state.getIn(['bookings', String(id), 'promoObject']);
	}

	static getBreakup(state, id) {
		if (state.hasIn(['bookings', String(id), 'breakup'])) {
			return state.getIn(['bookings', String(id), 'breakup']);
		}
		return undefined;
	}

	static getBreakupFetchingStatus(state, id) {
		return state.getIn(['bookings', String(id), 'fetchingBreakup']);
	}

	static getOrdersList(state) {
		return state.getIn(['orderStatus', 'data']);
	}

	static getIsFetchingOrdersList(state) {
		return state.getIn(['orderStatus', 'isFetching']);
	}

	// this gets order status for confirmation page, which has partial data for logged out user too.
	static getOrderStatusConfirmation(state) {
		return state.getIn(['orderStatusConfirmation', 'data']);
	}

	static getIsFetchingOrderStatusConfirmation(state) {
		return state.getIn(['orderStatusConfirmation', 'isFetching']);
	}

	// orderDetails is for one order only
	static getOrderDetails(state) {
		return state.getIn(['orderDetails', 'data']);
	}

	static getIsFetchingOrderDetails(state) {
		return state.getIn(['orderDetails', 'isFetching']);
	}

	static getErrorInfo(state) {
		return state.getIn(['serverStatus', 'info']);
	}

	static getAllCategoryIds(state) {
		const categoriesByCity = state.getIn(['categoryStore', 'byId']);
		return categoriesByCity
			.valueSeq()
			.sortBy(x => x.get('name'), (x, y) => x.localeCompare(y))
			.reduce((acc, x) => acc.push(x.get('id')), new List());
	}

	static getSuperCategoryIdsByCityCode(state, cityCode) {
		return state.getIn([
			'categoryStore',
			'byCityCode',
			cityCode,
			'superCategoryIds',
		]);
	}

	static getCategoryMap(state) {
		return state.getIn(['categoryStore', 'byId']);
	}

	static getCategory(state, categoryId) {
		return state.getIn(['categoryStore', 'byId', String(categoryId)]);
	}

	static getCategoryName(category) {
		return category.get('displayName');
	}

	static getCategoryID(category) {
		return category.get('id');
	}

	static getCategoryIdsByCityCode(state, cityCode) {
		return state.getIn(['categoryStore', 'byCityCode', cityCode, 'ids']);
	}

	static getCategoryChildren(state, categoryId) {
		const category = StateUtils.getCategory(state, categoryId);
		const childrenIds = category ? category.get('childrenIds') : new List();
		const categoryMap = state.getIn(['categoryStore', 'byId']);
		return childrenIds
			.filter(id => categoryMap.has(id))
			.map(id => StateUtils.getCategory(state, id))
			.filter(c => Boolean(c));
	}

	static isCategoryFetching(state, categoryId, depth = 0) {
		const statusKey = `${categoryId}:${depth}`;
		return Boolean(
			state.getIn(['categoryStore', 'status', 'isFetching', statusKey]),
		);
	}

	static getMockStore(state) {
		const mockStore = {};
		mockStore.getState = () => state;
		return mockStore;
	}

	// sortType could be 'Trending' or 'Popularity'
	static getProductIdListFromState(state, sortType) {
		let trendingProductIdsFromAllCities = new List();
		const trendingProductIdsFromAllCitiesDeFlattened = state
			.get('productList')
			.filter(value =>
				value.hasIn([`sort-type=${sortType}`, 'productIdList']),
			)
			.valueSeq()
			.map(x =>
				x.getIn([`sort-type=${sortType}`, 'productIdList']).slice(0, 2),
			)
			.slice(0, 3);

		trendingProductIdsFromAllCitiesDeFlattened.forEach(ids => {
			trendingProductIdsFromAllCities = trendingProductIdsFromAllCities.concat(
				ids,
			);
		});
		return trendingProductIdsFromAllCities;
	}

	static getSelectedDate(state, id) {
		return state.getIn(['bookings', String(id), 'selectedDate']);
	}

	static getSelectedTime(state, id) {
		return state.getIn(['bookings', String(id), 'selectedTime']);
	}

	static getSelectedTourId(state, id) {
		return state.getIn(['bookings', String(id), 'selectedTourId']);
	}

	static getSelectionMap(state, id) {
		return state.getIn(['bookings', String(id), 'selectionMap']);
	}

	static getGroupSize(state, id) {
		return state.getIn(['bookings', String(id), 'groupSize']);
	}

	static getVariantOrdering(state, id) {
		return state.getIn(['bookings', String(id), 'variantOrdering']);
	}

	static shouldFetch(state, url, cacheTimeInSeconds) {
		const fetches = state.get('fetchStore');
		if (!fetches.has(url)) return true;
		const lastFetched = fetches.get(url);
		const now = new Date().getTime();
		return now > lastFetched + cacheTimeInSeconds * 1000;
	}

	static getPaymentGateway(
		state,
		cardBin,
		isCardCheckRequired,
		hasAssociatedPaymentGateway,
	) {
		if (
			isCardCheckRequired &&
			cardBin &&
			String(cardBin).length === CARD_BIN_LENGTH &&
			hasAssociatedPaymentGateway
		) {
			return state.getIn([
				'paymentGatewayDetails',
				String(cardBin),
				'paymentGateway',
			]);
		}
		return state.getIn([
			'paymentGatewayDetails',
			'default',
			'paymentGateway',
		]);
	}

	static getCardCheckFlag(state) {
		return state.getIn(['paymentGatewayDetails', 'cardCheckRequired']);
	}

	static getWishlistStore(state) {
		return state.get('wishlistStore');
	}

	static getWishlistCount(state) {
		const user = StateUtils.getUser(state);
		const wishlistStore = StateUtils.getWishlistStore(state);
		if (user) {
			// count number of unique products in wishlist
			const userId = user.get('customerId').toString();
			const userWishlistIds =
				wishlistStore.getIn(['byUserId', userId, 'ids']) ||
				new List([]);
			const wishlistedProductIds = userWishlistIds.reduce((acc, wId) => {
				const productIds = wishlistStore.getIn([
					'byId',
					wId,
					'tourGroupIds',
				]);
				return acc.concat(productIds);
			}, new Set());
			return wishlistedProductIds.size;
		}
		return 0;
	}

	static getSearchResults(state, query, cityCode) {
		return state.getIn([
			'searchResults',
			query,
			cityCode || 'WORLD',
			'results',
		]);
	}

	static getFetchingStatusFromSearchResults(
		state,
		query,
		isProduct,
		cityCode,
	) {
		return state.getIn([
			'searchResults',
			query,
			cityCode || 'WORLD',
			'results',
			isProduct ? 'products' : 'collections',
			'isFetching',
		]);
	}

	static getUserGeoLocation(state) {
		return state.get('userGeoLocation');
	}

	static hasAssociatedPaymentGateway(state, cardBin) {
		return state.hasIn(['paymentGatewayDetails', String(cardBin)]);
	}

	static getSelectedSeatsValidationDetails(state) {
		return state.get('selectedSeatsValidationDetails');
	}
}

export const getConfigs = state => state.get('domainConfig');

export const getDomainLogoConfig = state => getConfigs(state).getIn(['logo']);

export const getAllConfigs = (state, configKey) => state.getIn([configKey]);

export default StateUtils;
