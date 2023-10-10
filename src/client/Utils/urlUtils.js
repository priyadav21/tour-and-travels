import { browserHistory } from 'react-router';
import queryParser from 'query-string';
import { Map } from 'immutable';
import { ProfileType } from '../Models/user';
import EnvUtils from './envUtils';
import StateUtils from './stateUtils';
import StringUtils from './stringUtils';
import { validateDate, validateTime } from './validationUtils';
import Gen from './gen';
import DateUtils from './dateUtils';
import {
	FILTER_KEYS,
	FLEXIBLE_START_TIME,
	PAX_QUERY_PREFIX,
	PRODUCT_BOOKING_STAGE,
} from '../Constants/constants';
import { hasValidPax } from './bookingFlowUtils';

export const getWebPathString = str =>
	StringUtils.replaceNotAlphaNumbericWithHyphen(str.toLowerCase());

export const getApiString = str => (str || '').toUpperCase().replace('-', '_');

/**
 * Returns internal host for server-side calls, else the public endpoint
 * Uses environment variables API_HOST_INTERNAL and API_HOST,
 *
 * @returns string - The api server location
 */
export const getApiBaseUrl = () => {
	if (EnvUtils.isServer()) {
		return process.env.API_BASE_URL_INTERNAL;
	}
	return process.env.API_BASE_URL;
};

export const getApiCDNBaseUrl = ({ state = new Map() }) => {
	if (StateUtils.getUserProfileType(state) === ProfileType.AFFILIATE) {
		return getApiBaseUrl();
	}
	return process.env.API_CDN_BASE_URL;
};

/**
 *
 * @returns string - The base URL of the server
 */
export const getBaseUrl = () => process.env.BASE_URL;

export const getBaseHost = () => process.env.BASE_HOST;

export const getCityFeedLink = cityCode =>
	`${getBaseUrl()}/cities/${getWebPathString(cityCode)}`;

export const getCategoryParams = category => {
	const { id, tags } = category;
	const tagsJoined = tags.join(',');
	return `tags=${tagsJoined}&categoryId=${id}`;
};

export const getQueryObject = location => queryParser.parse(location.search);

export const getQueryObjectFromUrl = url => {
	if (!url || !url.includes('?')) return {};
	const queryString = url.slice(url.indexOf('?') + 1);
	return queryParser.parse(queryString);
};

export const getStringifiedQueryFromObject = (queryJson, options) =>
	queryParser.stringify(queryJson, options);

export const getPathnameFromUrl = url => {
	if (!url) return '';
	if (url.includes('?')) return url.slice(0, url.indexOf('?'));
	return url;
};

export const getMergedQueryParams = (location, queryParamsMap) => {
	const queryObject = new Map(getQueryObject(location)).mergeDeep(
		queryParamsMap,
	);
	return getStringifiedQueryFromObject(queryObject.toJS());
};

export const getBookingLandingStageUrl = url => {
	const bookingUrl = url.replace('/tour/', '/book/');
	const { SELECT } = PRODUCT_BOOKING_STAGE;
	const pathname = getPathnameFromUrl(bookingUrl);
	const query = getQueryObjectFromUrl(bookingUrl);
	const selectPageQuery = Object.assign({}, query, { stage: SELECT });
	return `${pathname}?${getStringifiedQueryFromObject(selectPageQuery)}`;
};

export const getBookingStageUrl = (location, stage) => {
	const newLocation = Gen.clone(location);
	const url = newLocation.pathname.replace('/tour/', '/book/');
	const queryJson = getQueryObject(newLocation);
	queryJson.stage = stage;
	return `${url}?${getStringifiedQueryFromObject(queryJson)}`;
};

export const getCurrencyFromUrl = location => {
	const query = getQueryObject(location);
	if (query && query.currencyCode && !Array.isArray(query.currencyCode)) {
		return query.currencyCode.toUpperCase();
	}
	return null;
};

export const getLanguageFromUrl = location => {
	const query = getQueryObject(location);
	if (query && query.languageCode && !Array.isArray(query.languageCode)) {
		return query.languageCode.toLowerCase();
	}
	return null;
};

export const getDateFromUrl = location => {
	const query = getQueryObject(location);
	if (query && validateDate(query.date) && !Array.isArray(query.date)) {
		return query.date;
	}
	return null;
};

export const getTimeFromUrl = location => {
	const query = getQueryObject(location);
	if (query && query.time && !Array.isArray(query.time)) {
		if (query.time === FLEXIBLE_START_TIME) {
			return query.time;
		} else if (validateTime(query.time)) {
			return DateUtils.formatToInventoryTime(query.time);
		}
	}
	return null;
};

export const getVariantFromUrl = location => {
	const query = getQueryObject(location);
	if (query && query.variantId && !Array.isArray(query.variantId)) {
		return query.variantId;
	}
	return null;
};

export const getPaxFromUrl = location => {
	const query = getQueryObject(location);
	if (query) {
		return Gen.fromEntries(
			Object.entries(query)
				.filter(
					([paramKey, paramValue]) =>
						paramKey.toLowerCase().startsWith(PAX_QUERY_PREFIX) &&
						!isNaN(Number(paramValue)),
				)
				.map(([paramKey, paramValue]) => [
					paramKey.slice(PAX_QUERY_PREFIX.length),
					paramValue,
				]),
		);
	}
	return null;
};

export const getSourceFromUrl = location => {
	const query = getQueryObject(location);
	if (query && query.source && !Array.isArray(query.source)) {
		return query.source;
	}
	return null;
};

export const getSourcePiidFromUrl = location => {
	const query = getQueryObject(location);
	if (query && query.sourcePiid && !Array.isArray(query.sourcePiid)) {
		return query.sourcePiid;
	}
	return null;
};

export const getCouponCodeFromUrl = location => {
	const query = getQueryObject(location);
	if (query && query.couponCode && !Array.isArray(query.couponCode)) {
		return query.couponCode;
	}
	return null;
};

export const getConversionTrackingParameterFromUrl = location => {
	const query = getQueryObject(location);
	if (
		query &&
		query.trackConversion &&
		!Array.isArray(query.trackConversion)
	) {
		return query.trackConversion;
	}
	return null;
};

export const getSelectorModalFromUrl = location => {
	const query = getQueryObject(location);
	if (query && query.selector && !Array.isArray(query.selector)) {
		return query.selector;
	}
	return null;
};

export const getSanitizedPaxQuery = people => {
	if (hasValidPax(people)) {
		const { selectionMap, groupSize } = people;
		if (groupSize) {
			return {
				[`${PAX_QUERY_PREFIX}groupSize`]: groupSize,
			};
		}
		return Gen.fromEntries(
			Object.entries(selectionMap.toJS()).map(
				([paxType, paxSelection]) => [
					`${PAX_QUERY_PREFIX}${paxType.toLowerCase()}`,
					paxSelection,
				],
			),
		);
	}
	return {};
};

export const getFilters = location => {
	const queryObject = getQueryObjectFromUrl(
		decodeURIComponent(location.search),
	);
	let filters = new Map({});
	FILTER_KEYS.forEach(key => {
		if (Object.prototype.hasOwnProperty.call(queryObject, key)) {
			filters = filters.set(key, queryObject[key]);
		}
	});
	return filters;
};

export const removeFilterKeys = query => {
	const newQuery = Object.assign({}, query);
	FILTER_KEYS.forEach(key => {
		delete newQuery[key];
	});
	return newQuery;
};

export const replacePageQuery = query => {
	const { pathname } = browserHistory.getCurrentLocation();
	const newLoc = browserHistory.createLocation({ pathname, query });
	browserHistory.replace(newLoc);
};

export const changePageQuery = query => {
	const { query: currentQuery } = browserHistory.getCurrentLocation();
	replacePageQuery({ ...currentQuery, ...query });
};

export const removePageQuery = queryParam => {
	const { query: currentQuery } = browserHistory.getCurrentLocation();
	const newQuery = Gen.fromEntries(
		Object.entries(currentQuery).filter(([param]) => param !== queryParam),
	);
	replacePageQuery({ ...newQuery });
};

export const doesLocationIncludeString = (stringToCheck, location) => {
	if (!location) {
		return false;
	}
	const { pathname } = location;
	return pathname.includes(stringToCheck);
};

export const doesStringMatchQueryParameters = (stringToCheck, location) => {
	if (!location) {
		return false;
	}
	const { query } = location;
	return query && Object.keys(query).includes(stringToCheck);
};

export const getHostName = url => {
	const match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
	if (
		match != null &&
		match.length > 2 &&
		typeof match[2] === 'string' &&
		match[2].length > 0
	) {
		return match[2];
	}
	return null;
};

export const replaceTestingEnvURLwithProductionURL = url => {
	const hostName = getHostName(url);
	if (hostName) {
		return url.replace(hostName, 'touroxy.com');
	}
	return url;
};

export const isNumericProductId = id => !isNaN(id);

export const getErrorMessageFromUrl = location => {
	const queryObject = getQueryObjectFromUrl(
		decodeURIComponent(location.search),
	);
	return queryObject && queryObject.errorMessage
		? queryObject.errorMessage
		: null;
};

export const constructCityURL = currentCityCode => {
	if (currentCityCode) {
		return `/cities/${getWebPathString(currentCityCode)}`;
	}
	return '/';
};
