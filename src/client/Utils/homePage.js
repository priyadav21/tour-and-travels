import { browserHistory } from 'react-router';
import StateUtils from '../Utils/stateUtils';
import { getWhitelistedCategoryUrl } from '../Utils/hostUtils';
import { redirect } from '../Server/errors';
import { getBaseUrl, getWebPathString } from '../Utils/urlUtils';
import {
	ACTIVE_LANGUAGE_CODES,
	BANNER_NON_CITY_KEY,
	BANNERS_PLATFORM,
	PAGE_TYPES,
	SORT_TYPE,
} from '../Constants/constants';
import { changePage } from '../Actions/page';
import { fetchSuperCategoriesAll } from '../Thunks/category';
import { fetchProductList } from '../Thunks/productList';
import { fetchBanners } from '../Thunks/banner';
import { fetchCities } from '../Thunks/city';
import PlatformUtils from '../Utils/platformUtils';
import Analytics from '../Utils/analytics';

const checkForRedirect = ({ store, location }) => {
	const isBot = StateUtils.isBot(store.getState());
	const host = StateUtils.getHost(store.getState());
	const redirectUrl = getWhitelistedCategoryUrl({ host });
	if (redirectUrl) {
		return Promise.reject(redirect(redirectUrl));
	}
	const userLandingUrl = StateUtils.getUserLandingUrl(store.getState());
	if (userLandingUrl) {
		return Promise.reject(redirect(userLandingUrl));
	}
	const cityCode = StateUtils.getCurrentCityCode(store.getState());
	if (cityCode && !isBot) {
		return Promise.reject(
			redirect(`/cities/${getWebPathString(cityCode)}${location.search}`),
		);
	}
	return Promise.resolve();
};

const getMetaTags = () => {
	const tags = ACTIVE_LANGUAGE_CODES.map(lang => {
		return `<link rel="alternate" hreflang="${lang.toLowerCase()}" href="${getBaseUrl()}${
			lang.toLowerCase() !== 'en' ? `/${lang}` : ``
		}" />`;
	});
	tags.push(
		`<link rel="alternate" hreflang="x-default" href="${getBaseUrl()}" />`,
	);
	return tags.reduce((tag, allTags) => `${allTags} \n ${tag}`, '');
};

const getTitle = () =>
	'Touroxy: Discover Attractions, Activities & Events In Your City';

const getCanonicalUrl = ({ params: { lang } }) => {
	const langPrefix = lang && lang.toUpperCase() !== 'EN' ? `/${lang}` : ``;
	return `${getBaseUrl()}${langPrefix}`;
};

const getMetaDescription = () =>
	'Explore and book the top attractions, sightseeing tours, events ' +
	'and things to do in your city. Get exclusive discounts and ' +
	'priority access with Touroxy.';

const sendHomePageViewEvent = () => {
	Analytics.trackEvent({
		eventName: 'Home Page Viewed',
	});
	Analytics.sendPageView({
		pageType: PAGE_TYPES.NON_CITY_FEED_SCREEN,
	});
};

const mapStateToProps = (state, _ownProps) => ({
	cityCodes: StateUtils.getDiscoverableCityCodes(state),
	citiesMap: StateUtils.getCitiesMap(state),
	categoryMap: StateUtils.getCategoryMap(state),
	categoryIds: StateUtils.getAllCategoryIds(state),
	currentCityCode: StateUtils.getCurrentCityCode(state),
	user: StateUtils.getUser(state),
	host: StateUtils.getHost(state),
	trendingProductIds: StateUtils.getProductIdListFromState(
		state,
		SORT_TYPE.TRENDING,
	),
	bestSellerProductIds: StateUtils.getProductIdListFromState(
		state,
		SORT_TYPE.POPULARITY,
	),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	onMountDispatch() {
		dispatch(changePage(PAGE_TYPES.NON_CITY_FEED));
		dispatch(fetchSuperCategoriesAll({ lang: ownProps.params.lang }));
		// TODO: Shouldn't he hardcoded. Moreover the api call should be combined.
		dispatch(
			fetchProductList({
				cityCode: 'DUBAI',
				params: `sort-type=${SORT_TYPE.POPULARITY}`,
				lang: ownProps.params.lang,
			}),
		);
		dispatch(
			fetchProductList({
				cityCode: 'PARIS',
				params: `sort-type=${SORT_TYPE.POPULARITY}`,
				lang: ownProps.params.lang,
			}),
		);
		dispatch(
			fetchProductList({
				cityCode: 'NEW_YORK',
				params: `sort-type=${SORT_TYPE.POPULARITY}`,
				lang: ownProps.params.lang,
			}),
		);
		dispatch(
			fetchProductList({
				cityCode: 'DUBAI',
				params: `sort-type=${SORT_TYPE.TRENDING}`,
				lang: ownProps.params.lang,
			}),
		);
		dispatch(
			fetchProductList({
				cityCode: 'PARIS',
				params: `sort-type=${SORT_TYPE.TRENDING}`,
				lang: ownProps.params.lang,
			}),
		);
		dispatch(
			fetchProductList({
				cityCode: 'NEW_YORK',
				params: `sort-type=${SORT_TYPE.TRENDING}`,
				lang: ownProps.params.lang,
			}),
		);
		dispatch(
			fetchBanners({
				cityCode: BANNER_NON_CITY_KEY,
				params: `platform=${
					PlatformUtils.isDesktop()
						? BANNERS_PLATFORM.DESKTOP
						: BANNERS_PLATFORM.MOBILE
				}`,
			}),
		);
	},
});

const mergeProps = (stateProps, dispatchProps, _ownProps) => {
	const onMountDispatch = () => {
		const { host } = stateProps;
		const redirectUrl = getWhitelistedCategoryUrl({ host });
		if (redirectUrl) {
			browserHistory.replace(redirectUrl);
		}
		dispatchProps.onMountDispatch();
	};

	const onUpdateDispatch = () => {
		const { host } = stateProps;
		const redirectUrl = getWhitelistedCategoryUrl({ host });
		if (redirectUrl) {
			browserHistory.replace(redirectUrl);
		}
	};

	return {
		...stateProps,
		...dispatchProps,
		onMountDispatch,
		onUpdateDispatch,
	};
};

const fetchData = ({ store, params, req }) =>
	Promise.all([
		store.dispatch(fetchCities()),
		store.dispatch(fetchSuperCategoriesAll({ lang: params.lang })),
		store.dispatch(
			fetchProductList({
				cityCode: 'DUBAI',
				params: `sort-type=${SORT_TYPE.POPULARITY}`,
				lang: params.lang,
				req,
			}),
		),
		store.dispatch(
			fetchProductList({
				cityCode: 'PARIS',
				params: `sort-type=${SORT_TYPE.POPULARITY}`,
				lang: params.lang,
				req,
			}),
		),
		store.dispatch(
			fetchProductList({
				cityCode: 'NEW_YORK',
				params: `sort-type=${SORT_TYPE.POPULARITY}`,
				lang: params.lang,
				req,
			}),
		),
		store.dispatch(
			fetchProductList({
				cityCode: 'DUBAI',
				params: `sort-type=${SORT_TYPE.TRENDING}`,
				lang: params.lang,
				req,
			}),
		),
		store.dispatch(
			fetchProductList({
				cityCode: 'PARIS',
				params: `sort-type=${SORT_TYPE.TRENDING}`,
				lang: params.lang,
				req,
			}),
		),
		store.dispatch(
			fetchProductList({
				cityCode: 'NEW_YORK',
				params: `sort-type=${SORT_TYPE.TRENDING}`,
				lang: params.lang,
				req,
			}),
		),
		store.dispatch(
			fetchBanners({
				cityCode: BANNER_NON_CITY_KEY,
				params: `platform=${
					PlatformUtils.isDesktop()
						? BANNERS_PLATFORM.DESKTOP
						: BANNERS_PLATFORM.MOBILE
				}`,
			}),
		),
	]);

export {
	checkForRedirect,
	getMetaTags,
	getTitle,
	getCanonicalUrl,
	getMetaDescription,
	sendHomePageViewEvent,
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
	fetchData,
};
