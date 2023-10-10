import List from 'immutable';
import { strings } from '../Constants/strings';
import CategoryUtils from '../Utils/categoryUtils';
import { getBaseUrl, getWebPathString } from '../Utils/urlUtils';
import StateUtils from '../Utils/stateUtils';

// To be called from server end
const getTitle = ({ store, params, location }) => {
	const { lang = 'en' } = params;
	const cityCode = CategoryUtils.getCityCode({ store, location, params });
	const cityDisplayName = StateUtils.getCity(store.getState(), cityCode).get(
		'displayName',
	);

	let title = `Things to do in ${cityDisplayName} | ${strings.SIGHTSEEING}, ${strings.TOURS} & ${strings.TICKETS} on Touroxy`;
	if (title.length > 69)
		title = `Things to do in ${cityDisplayName} | ${strings.TOURS} & ${strings.TICKETS} on Touroxy`;

	const categoryId = CategoryUtils.getCategoryId({ location, params });
	if (categoryId) {
		const category = CategoryUtils.getCategory({ store, location, params });
		if (category) {
			const {
				displayName,
				language: categoryLang,
				title: categoryTitle,
			} = category;
			title = `${category.get('displayName')} - ${strings.BEST_PRICE} ${
				strings.TICKETS
			}, ${strings.TOURS} and ${
				strings.REVIEWS
			} - ${cityDisplayName} | Touroxy`;
			if (title.length > 69)
				title = `${displayName} - ${strings.TICKETS}, ${strings.TOURS} and ${strings.REVIEWS} - ${cityDisplayName} | Touroxy`;
			if (title.length > 69)
				title = `${displayName} - ${strings.TICKETS} & ${strings.TOURS} - ${cityDisplayName} | Touroxy`;
			if (
				categoryLang.toUpperCase() === lang.toUpperCase() &&
				categoryTitle
			)
				title = categoryTitle;
		}
	}

	return title;
};

const getAmpUrl = pageInfo => {
	const category = CategoryUtils.getCategory(pageInfo);
	if (!category) return null;
	const { params } = pageInfo;
	return CategoryUtils.getCategoryUrl({
		category,
		paramLang: params.lang,
		withBase: true,
		isAmp: true,
	});
};

const isNoIndex = pageInfo => {
	const category = CategoryUtils.getCategory(pageInfo);
	const { params } = pageInfo;
	return CategoryUtils.isNoIndex({ category, paramLang: params.lang });
};

const getCanonicalUrl = ({ store, params, location }) => {
	const { lang: paramLang } = params;
	const categoryId = CategoryUtils.getCategoryId({ location, params });
	if (!categoryId)
		return `${getBaseUrl()}/cities/${getWebPathString(params.city)}`;
	const category = CategoryUtils.getCategory({ store, location, params });
	const canonicalUrl = category.get('canonicalUrl');
	if (canonicalUrl) {
		return `${getBaseUrl()}${canonicalUrl}`;
	}
	const { urlSlug } = category; // ideally this should be there in every category model. but this is to support older models. like in search
	const langPrefix =
		paramLang && paramLang.toUpperCase() !== 'EN' ? `/${paramLang}` : '';
	return `${getBaseUrl()}${langPrefix}/category/${category.get('id')}${
		urlSlug ? '/' : ''
	}${urlSlug || ''}`;
};

const getMetaDescription = ({ store, params, location }) => {
	const cityCode = CategoryUtils.getCityCode({ store, location, params });
	const cityDisplayName = StateUtils.getCity(store.getState(), cityCode).get(
		'displayName',
	);
	const superCategoryIds =
		StateUtils.getSuperCategoryIdsByCityCode(store.getState(), cityCode) ||
		new List();
	const superCategoryNames = superCategoryIds
		.map(x => StateUtils.getCategory(store.getState(), x) || null)
		.filter(x => x)
		.map(x => x.get('displayName'))
		.toJS();
	const categoriesString =
		superCategoryNames.length > 4
			? `${superCategoryNames.splice(0, 4).join(', ')} and more`
			: superCategoryNames.join(', ');

	let desc = `Discover the best things to do in ${cityDisplayName}. Book tickets & tours to ${categoriesString}. Best price guaranteed.`;
	if (desc.length > 160)
		desc = `Discover the best things to do in ${cityDisplayName}. Book tickets & tours to ${categoriesString}. Best price guaranteed.`;

	const categoryId = CategoryUtils.getCategoryId({ location, params });
	if (categoryId) {
		const category = CategoryUtils.getCategory({ store, location, params });
		if (category) {
			desc = `Book your ${category.get(
				'displayName',
			)} tickets & tours online to save time and money. Find ${category.get(
				'displayName',
			)} information, timings, reviews and photos here.`; // eslint-disable-line max-len
		}

		if (category.get('metaDescription')) {
			desc = category.get('metaDescription');
		}
	}

	return desc;
};

const getMetaTags = pageInfo =>
	CategoryUtils.getCategoryMetaTags({
		category: CategoryUtils.getCategory(pageInfo),
		isAmp: false,
	});

export {
	getTitle,
	getAmpUrl,
	getCanonicalUrl,
	getMetaDescription,
	getMetaTags,
	isNoIndex,
};
