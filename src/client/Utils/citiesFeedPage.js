import { getApiString, getBaseUrl, getWebPathString } from '../Utils/urlUtils';
import StateUtils from '../Utils/stateUtils';
import { fetchCities } from '../Thunks/city';
import { notFound, redirect } from 'Server/errors';
import { getWhitelistedCategoryUrl } from '../Utils/hostUtils';
import { ACTIVE_LANGUAGE_CODES } from '../Constants/constants';

const getTitleForCity = cityName => {
	let title = `10 Best ${cityName} Tours, Attractions & Activities in ${new Date().getYear() +
		1900} | Touroxy`;
	if (title.length > 69)
		title = `10 Best ${cityName} Tours, Attractions & Activities | Touroxy`;
	return title;
};

// To be called from server end
const getTitle = ({ store }) => {
	const currentCityCode = store.getState().getIn(['city', 'currentCityCode']);
	const cityName = store
		.getState()
		.getIn(['city', 'citiesMap', currentCityCode, 'displayName']);
	return getTitleForCity(cityName);
};

const getMetaDescription = ({ store }) => {
	const currentCityCode = store.getState().getIn(['city', 'currentCityCode']);
	const cityName = store
		.getState()
		.getIn(['city', 'citiesMap', currentCityCode, 'displayName']);
	return `Discover the best things to do in ${cityName} with Touroxy. Book your ${cityName} tours & tickets online with our best price guarantee for a hassle free experience.`; // eslint-disable-line max-len
};

const getCanonicalUrl = ({ params: { lang, city } }) => {
	const langPrefix = lang && lang.toUpperCase() !== 'EN' ? `/${lang}` : ``;
	return `${getBaseUrl()}${langPrefix}/cities/${getWebPathString(city)}`;
};

const prePush = ({ store, params }) =>
	store.dispatch(fetchCities()).then(() => {
		const host = StateUtils.getHost(store.getState());
		const redirectUrl = getWhitelistedCategoryUrl({ host });
		if (redirectUrl) {
			return Promise.reject(redirect(redirectUrl));
		}
		const citiesMap = StateUtils.getCitiesMap(store.getState());
		const cityCode = getApiString(params.city);
		if (!citiesMap.get(cityCode))
			return Promise.reject(
				notFound(`Couldn't find the City: ${cityCode}`),
			);
		return Promise.resolve();
	});

const getMetaTags = ({ params }) => {
	const tags = ACTIVE_LANGUAGE_CODES.map(lang => {
		return `<link rel="alternate" hreflang="${lang.toLowerCase()}" href="${getBaseUrl()}${
			lang.toLowerCase() !== 'en' ? `/${lang}` : ``
		}/cities/${getWebPathString(params.city)}" />`;
	});
	tags.push(
		`<link rel="alternate" hreflang="x-default" href="${getBaseUrl()}/cities/${getWebPathString(
			params.city,
		)}" />`,
	);
	return tags.reduce((tag, allTags) => `${allTags} \n ${tag}`, '');
};

export {
	getTitle,
	getMetaDescription,
	getCanonicalUrl,
	prePush,
	getTitleForCity,
	getMetaTags,
};
