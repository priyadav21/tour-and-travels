import { fromJS, List } from 'immutable';
import {
	BANNER_IMAGE_SIZE,
	BANNER_TYPES,
	PAGE_TYPES,
	PRODUCT_BANNER_SIZE,
	STORE_ENTITY_TYPE,
	STORE_JS_VERSION,
	TIMER_INFO_EXPERIMENT,
	UNIT_ABBREVIATIONS,
} from '../Constants/constants';
import LocalStorage from './localStoreUtils';
import LogUtils from './logUtils';
import StringUtils from './stringUtils';
import { computeTimestampFromWildcard } from './timeUrgencyUtils';
import { strings } from '../Constants/strings';

class Gen {
	static truncateWithEllipsis({ text = '', limit = 54 }) {
		if (text.length < limit) {
			return text;
		}

		if (limit <= 3) {
			return text.substring(0, limit);
		}

		return `${text.substring(0, limit - 4)}...`;
	}

	static getProfileText(ageFrom, ageTo) {
	/* 	if (ageFrom) {
			if (ageTo) {
				return strings.formatString(
					strings.CP_X_TO_Y_YEAR,
					ageFrom,
					ageTo,
				);
			}
			return strings.formatString(strings.CP_ABOVE_X_YEAR, ageFrom);
		}
		if (ageTo) {
			return strings.formatString(strings.CP_UNDER_X_YEAR, ageTo);
		} */
		// return strings.CP_ANY_AGE;
		return "EN";
	}

	/**
	 * Formats the price with currency symbol and its precision
	 * @param price: Price Value as a Number
	 * @param currency: Currency object with localSymbol and precision
	 * @param truncate: Boolean value which governs whether the resulting price is truncated or not
	 * @param truncateAfter: Integer that specifies the minimum digits a number should be for it to be truncated (truncate parameter should be true)
	 */
	static formatPrice(price, currency, truncate = false, truncateAfter = 3) {
		const { localSymbol } = currency;
		return `${localSymbol}${Gen.formatPriceValue(
			price,
			currency,
			truncate,
			truncateAfter,
		)}`;
	}

	static floorPrice(price) {
		return Math.floor(parseFloat(price));
	}

	static formatPriceValue(
		price,
		currency,
		truncate = false,
		truncateAfter = 3,
	) {
		const { precision } = currency;
		const priceAsString = Gen.toFixedWithoutRounding(
			parseFloat(price),
			precision || 2,
		);
		if (truncate) {
			return Gen.truncateNumber(parseFloat(priceAsString), truncateAfter);
		}
		return StringUtils.stripUnnecessaryDecimals(
			parseFloat(priceAsString).toLocaleString(),
		);
	}

	static truncateNumber(num, truncateAfter = 3) {
		if (num < 10 ** (truncateAfter - 1)) return num;
		let truncatedNumber = num;
		for (let i = UNIT_ABBREVIATIONS.length - 1; i >= 0; i--) {
			const truncationSize = 10 ** ((i + 1) * 3);
			if (num >= truncationSize) {
				truncatedNumber =
					Number(
						Gen.toFixedWithoutRounding(num / truncationSize, 1),
					).toLocaleString() + UNIT_ABBREVIATIONS[i];
				break;
			}
		}
		return truncatedNumber;
	}

	static toFixedWithoutRounding(num, precision) {
		const precisionExp = 10 ** precision;
		return Math.trunc(num * precisionExp) / precisionExp;
	}

	static clone(obj) {
		return fromJS(obj).toJS();
	}

	static sanitizeStore() {
		const storejsVersionInBrowser = LocalStorage.read(
			`${STORE_ENTITY_TYPE.STORE_VERSION}`,
		);
		if (storejsVersionInBrowser) {
			if (storejsVersionInBrowser !== STORE_JS_VERSION) {
				LocalStorage.clear();
			}
		}
		LocalStorage.write(
			`${STORE_ENTITY_TYPE.STORE_VERSION}`,
			STORE_JS_VERSION,
		);
	}

	static customMergeDeep(a, b) {
		// both a and b are typed-immutable records and merge list is not supported in typed-immutable, hence doing this.
		// https://github.com/typed-immutable/typed-immutable/issues/35#issuecomment-245569946
		// TODO: We should try typescript for type safety.
		const rawA = a.toJS();
		const rawB = b.toJS();
		const iA = fromJS(rawA);
		const iB = fromJS(rawB);
		return iA.mergeDeep(iB);
	}

	static getSanitizedCityName(cityName) {
		return cityName.replace('-', '_').toUpperCase();
	}

	static selectTextInNode(node) {
		if (document.selection) {
			const range = document.body.createTextRange();
			range.moveToElementText(node);
			range.select();
		} else if (window.getSelection) {
			const range = document.createRange();
			range.selectNodeContents(node);
			window.getSelection().removeAllRanges();
			window.getSelection().addRange(range);
		}
	}

	static htmlToString(html) {
		if (!html) return html;
		const str = html.replace(/<\/?[^>]+(>|$)/g, ' ');
		return str.replace(/"/g, '“');
	}

	static jsonEquals(a, b) {
		return JSON.stringify(a) === JSON.stringify(b);
	}

	static hashCode(input) {
		let hash = 0;
		if (input.length === 0) return hash;
		for (let i = 0; i < input.length; i++) {
			const char = input.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash &= hash; // Convert to 32bit integer
		}
		return hash;
	}

	/**
	 * Combines dest with source with unique constraint
	 * @param oldItems array or immutable list that contains the starting items(primitives)
	 * @param newItems new array/List of items to be pushed
	 * @returns {Immutable.List}
	 */
	static combineUnique(oldItems, newItems) {
		let combined = new List(oldItems);
		for (const item of newItems) {
			if (combined.indexOf(item) === -1) combined = combined.push(item);
		}
		return combined;
	}

	/**
	 * @param start integer
	 * @param end integer
	 * @returns array of numbers from minOf(start, end) to maxOf(start, end)(exclusive)
	 */
	static range(start, end) {
		let s = start;
		let e = end;
		if (e < s) {
			s = end;
			e = start;
		}

		return new Array(e - s).fill(0).map((_, i) => i + s);
	}

	static getValidBannerInfoFromLocalStore = (
		location,
		params,
		currentCity,
		bannerDataFromLocalStore,
	) => {
		const bannerType = bannerDataFromLocalStore.type;
		switch (bannerType) {
			case BANNER_TYPES.COUPON: {
				const currentTourGroupId = params.id;
				const tourGroupIdFromStore = bannerDataFromLocalStore.validId;
				return currentTourGroupId === tourGroupIdFromStore &&
					!location.pathname.includes('category')
					? bannerDataFromLocalStore
					: null;
			}
			default: {
				const currentCityFromStore = bannerDataFromLocalStore.validCity;
				return currentCityFromStore === currentCity
					? bannerDataFromLocalStore
					: null;
			}
		}
	};

	static checkBannerInfoInLocalStore = (bannerInfo, storeValue) =>
		storeValue.d === bannerInfo.d &&
		storeValue.c === bannerInfo.c &&
		storeValue.t === bannerInfo.t &&
		storeValue.t === bannerInfo.t &&
		storeValue.type === bannerInfo.type &&
		storeValue.displayType === bannerInfo.displayType &&
		storeValue.onClose === bannerInfo.onClose &&
		storeValue.platform === bannerInfo.platform &&
		storeValue.tnc === bannerInfo.tnc &&
		storeValue.desc === bannerInfo.desc &&
		storeValue.actionPrimary === bannerInfo.actionPrimary &&
		storeValue.actionSecondary === bannerInfo.actionSecondary &&
		storeValue.formHint === bannerInfo.formHint &&
		storeValue.background === bannerInfo.background &&
		storeValue.isBannerSticky === bannerInfo.isBannerSticky;

	static getBannerInfo = (location, city, params) => {
		const bannerInfoRaw = location.query.bi;
		const currentCity = city.get('currentCityCode');
		let bannerInfo;
		if (bannerInfoRaw) {
			try {
				bannerInfo = JSON.parse(
					decodeURIComponent(atob(bannerInfoRaw)),
				);
				bannerInfo.isValid = true;
				if (bannerInfo.wildCard) {
					bannerInfo.d =
						computeTimestampFromWildcard(bannerInfo.wildCard) ||
						bannerInfo.d;
				}
				const storeValue = LocalStorage.read(TIMER_INFO_EXPERIMENT);
				if (
					storeValue &&
					Gen.checkBannerInfoInLocalStore(bannerInfo, storeValue)
				) {
					storeValue.openModal = true;
					storeValue.validCity = currentCity;
					storeValue.validId = params ? params.id : null;
					LocalStorage.write(TIMER_INFO_EXPERIMENT, storeValue);
					return storeValue;
				}
				bannerInfo.openModal = true;
				bannerInfo.validCity = currentCity;
				bannerInfo.validId = params ? params.id : null;
				// Can add some checks before writing to local storage
				LocalStorage.write(TIMER_INFO_EXPERIMENT, bannerInfo);
				return bannerInfo;
			} catch (e) {
				LogUtils.log(e);
			}
		}
		//Take info from local store with checks if present otherwise send a false bannerInfo
		const bannerInfoFromStore = LocalStorage.read(TIMER_INFO_EXPERIMENT);
		const validBannerInfoFromLocalStore = bannerInfoFromStore
			? Gen.getValidBannerInfoFromLocalStore(
					location,
					params,
					currentCity,
					bannerInfoFromStore,
			  )
			: null;
		return validBannerInfoFromLocalStore || { isValid: false };
	};

	static checkTimerBannerStrip() {
		return document ? !!document.querySelector('.timer-banner') : false;
	}

	static makeTwoDigit = number => `0${number}`.slice(-2);

	static assignPositiveValuedPropertyToObject = (object, value, key) =>
		value ? { ...object, [key]: value } : object;

	static getNodeFromClassName = className => {
		if (document) {
			return document.querySelector(`.${className}`);
		}
		return null;
	};

	static getHeightForContainerInPixels = node =>
		node && node.getBoundingClientRect()
			? node.getBoundingClientRect().height
			: 0;

	static getWidthForContainerInPixels = node =>
		node && node.getBoundingClientRect()
			? node.getBoundingClientRect().width
			: 0;

	static getLeftForContainerInPixels = node =>
		node && node.getBoundingClientRect()
			? node.getBoundingClientRect().left
			: 0;

	static takeOutKeys = obj =>
		obj
			.keySeq()
			.sort()
			.toArray();

	static fromEntries = iterable =>
		[...iterable].reduce(
			(obj, [key, val]) => Object.assign(obj, { [key]: val }),
			{},
		);

	static isEmptyString = val => val && val.length > 0;

	static isEven(n) {
		return n === 0 || !!(n && !(n % 2));
	}

	static getBannerDimensions = pageType => {
		if (pageType === PAGE_TYPES.PRODUCT) {
			const height = PRODUCT_BANNER_SIZE.HEIGHT;
			const width = PRODUCT_BANNER_SIZE.WIDTH;
			return { height, width };
		}
		const height = BANNER_IMAGE_SIZE.HEIGHT;
		const width = BANNER_IMAGE_SIZE.WIDTH;
		return { height, width };
	};

	static filterPredicateFactory = () => {
		const searchResultsByQuery = {};
		return ({ query, list }) => {
			if (searchResultsByQuery[query]) {
				return searchResultsByQuery[query];
			}
			const filteredList = list.filter(({ selectionText }) =>
				selectionText.toLowerCase().includes(query.toLowerCase()),
			);
			searchResultsByQuery[query] = filteredList;
			return filteredList;
		};
	};

	static getAppMetaTags = () => {
		const tags = [
      '<meta name="twitter:card" content="app" />',
      '<meta name="twitter:site" content="@touroxy" />',
      '<meta name="twitter:description" content="Find and  book tours, adventures, activities, things to do, rentals and amazing  places to stay. Book online over 1000000+ Tours  from 500000+ Suppliers Globally" />', // eslint-disable-line max-len,
      '<meta name="twitter:app:id:iphone" content="" />',
      '<meta name="twitter:app:id:ipad" content="" />',
      '<meta name="twitter:app:id:googleplay" content="com.tour.com" />'
    ];
		return tags.reduce((tag, allTags) => `${allTags} \n ${tag}`, '');
	};
}

export default Gen;
