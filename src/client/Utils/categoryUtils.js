import StateUtils from './stateUtils';
import {
	ACTIVE_LANGUAGE_CODES,
	CUSTOM_LANDING_PAGE_CATEGORIES,
} from '../Constants/constants';
import {
	burjKhalifaHtml,
	ferrariWorldHtml,
	nightSafariHtml,
	skiDubaiHtml,
} from '../Constants/customCategoryContent';
import { getApiString, getBaseUrl } from '../Utils/urlUtils';

class CategoryUtils {
	static isSuperCategory({ store, location, params }) {
		if (location.query.filters) return false;
		const state = store.getState();
		const categoryId = this.getCategoryId({ location, params });
		if (categoryId) {
			// get the super category here and check if it has some conditions.
			const category = StateUtils.getCategory(state, categoryId);
			const { childrenIds, heroImageUrl, heading, subtext } = category;
			if (childrenIds.size > 0 && heroImageUrl && heading && subtext)
				return true;
		}
		return false;
	}

	static getCategory({ store, location, params }) {
		return StateUtils.getCategory(
			store.getState(),
			this.getCategoryId({ location, params }),
		);
	}

	static getParams(category) {
		const { tags, id } = category;
		return `tags=${tags.join(',')}&categoryId=${id}`;
	}

	static getApiQuery({ store, location, params }) {
		// 1) tours/new-york?categoryId=21,tags=broadway,filters=1 (we assume someone came to this url with correct tags set.
		//                  once backend change is made to make catgoryId filter as priority, its irrelevant
		// 2) tours/new-york?tags=broadway,filters=1
		// 3) tours/new-york?filters=1
		// 4) category/21/slug?filters=1
		// 5) category/21/slug
		// api url is same as location.search for 1,2,3. for 4,5 we add category values for keys 'categoryId' and 'tags'

		const currentParams = location.search.substring(1);
		if (params.city || location.search.indexOf('categoryId') !== -1)
			return currentParams;
		const queryParams = this.getParams(
			this.getCategory({ store, location, params }),
		);
		if (currentParams.length === 0) return queryParams;
		return `${currentParams}&${queryParams}`;
	}

	static getCategoryId({ location, params }) {
		return params.id || location.query.categoryId;
	}

	static getCityCode({ store, location, params }) {
		const category = this.getCategory({ store, location, params });
		if (category) return category.get('cityCode');
		return getApiString(params.city);
	}

	static getCityAndCategoryId({ store, location, params }) {
		return {
			cityCode: this.getCityCode({ store, location, params }),
			categoryId: this.getCategoryId({ location, params }),
		};
	}

	static getCategoryUrl({
		category,
		paramLang,
		withBase = false,
		isAmp = false,
	}) {
		const { id: categoryId, urlSlug } = category; // ideally this should be there in every category model. but this is to support older models. like in search
		if (!category || !categoryId) return null;
		const langPrefix = paramLang ? `/${paramLang}` : '';
		const ampPrefix = isAmp ? '/amp' : '';
		const slugSuffix = urlSlug ? `/${urlSlug}` : '';
		return `${
			withBase ? getBaseUrl() : ''
		}${ampPrefix}${langPrefix}/category/${category.get('id')}${slugSuffix}`;
	}

	static getAlternateURL({
		category,
		paramLang,
		withBase = false,
		isAmp = false,
	}) {
		if (!category) return null;
		const urlSlug = category.get('urlSlug'); // ideally this should be there in every category model. but this is to support older models. like in search
		const langPrefix =
			paramLang && paramLang.toUpperCase() !== 'EN'
				? `/${paramLang.toLowerCase()}`
				: '';
		const ampPrefix = isAmp ? '/amp' : '';
		const slugSuffix = urlSlug ? `/${urlSlug}` : '';
		return `${
			withBase ? getBaseUrl() : ''
		}${ampPrefix}${langPrefix}/category/${category.get('id')}${slugSuffix}`;
	}

	static isNoIndex({ category, paramLang }) {
		if (!category) return true; // tour-list pages
		if (paramLang) {
			if (paramLang.toUpperCase() === 'EN') return true;
			if (
				category.get('language').toUpperCase() !==
				paramLang.toUpperCase()
			) {
				return true;
			}
		}
		return category.get('noIndex');
	}

	static getCategoryMetaTags({ category, isAmp = false }) {
		if (!category) return null;
		let tags = [
			`<link rel="alternate" hreflang="x-default" href="${CategoryUtils.getCategoryUrl(
				{
					category,
					isAmp,
					withBase: true,
				},
			)}" />`,
		];

		tags = tags.concat(
			ACTIVE_LANGUAGE_CODES.map(
				lang =>
					`<link rel="alternate" hreflang="${lang.toLowerCase()}" href="${CategoryUtils.getAlternateURL(
						{
							category,
							paramLang: lang,
							isAmp,
							withBase: true,
						},
					)}" />`,
			),
		);

		return tags.reduce((tag, allTags) => `${allTags} \n ${tag}`, '');
	}

	static isCustomHtmlApplicable = (categoryId, cookies, lang) =>
		lang === 'en' &&
		Object.values(CUSTOM_LANDING_PAGE_CATEGORIES).includes(categoryId);

	static isCustomHtmlExperimentApplicable = (
		categoryId,
		cookies,
		lang,
		isBot,
	) =>
		CategoryUtils.isCustomHtmlApplicable(categoryId, cookies, lang) &&
		!isBot;

	static fetchCustomHtml = categoryId => {
		switch (categoryId) {
			case CUSTOM_LANDING_PAGE_CATEGORIES.BURJ_KHALIFA:
				return burjKhalifaHtml;
			case CUSTOM_LANDING_PAGE_CATEGORIES.FERRARI_WORLD:
				return ferrariWorldHtml;
			case CUSTOM_LANDING_PAGE_CATEGORIES.NIGHT_SAFARI:
				return nightSafariHtml;
			case CUSTOM_LANDING_PAGE_CATEGORIES.SKI_DUBAI:
				return skiDubaiHtml;
			default:
				return null;
		}
	};

	static isBroadwayBTTFProduct = productId =>
		[
			4534,
			661,
			7704,
			740,
			1611,
			730,
			2548,
			8535,
			5831,
			7717,
			519,
			1293,
			4531,
			1701,
			2370,
			7706,
			512,
			508,
			4653,
			734,
			4654,
			4552,
			4473,
			507,
			517,
			5838,
			7700,
			516,
			7907,
			7707,
			8775,
			7909,
			8808,
			8776,
		].includes(productId);
}

export default CategoryUtils;
