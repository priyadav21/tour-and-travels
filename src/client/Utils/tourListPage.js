import { fromJS } from 'immutable';
import {
	getAmpUrl,
	getCanonicalUrl,
	getMetaDescription,
	getMetaTags,
	getTitle,
	isNoIndex,
} from '../Utils/categoryPage';
import CategoryUtils from '../Utils/categoryUtils';
import { fetchCities } from '../Thunks/city';
import {
	fetchCategoriesByCityCodeWithDepth,
	fetchCategoriesByIdWithDepth,
	fetchCategoryAndCategoriesByCityCodeWithDepth,
} from '../Thunks/category';
import StateUtils from '../Utils/stateUtils';
import { getQueryObject, getStringifiedQueryFromObject } from '../Utils/urlUtils';
import { notFound, redirect } from '../Server/errors';

const prePush = ({ store, params, location }) => {
	const categoryId = CategoryUtils.getCategoryId({ store, location, params });
	const { dispatch } = store;
	const categoryDispatch = categoryId
		? dispatch(
				fetchCategoriesByIdWithDepth({
					categoryId,
					depth: 1,
					lang: params.lang,
				}),
		  )
		: Promise.resolve();

	return categoryDispatch.then(() => {
		const cityCode = CategoryUtils.getCityCode({ store, location, params });
		const currentBaseUrl = location.pathname;
		const currentQuery = fromJS(getQueryObject(location));

		if (categoryId) {
			const category = CategoryUtils.getCategory({
				store,
				location,
				params,
			});
			if (!category)
				return Promise.reject(
					notFound(`Couldn't find the category: ${categoryId}`),
				);
			const categoryTags = category.get('tags').toJS();
			const filteredTags = fromJS(
				(currentQuery.get('tags') || '').split(','),
			)
				.filter(item => categoryTags.indexOf(item) === -1)
				.toJS()
				.join(',');
			const correctQuery =
				filteredTags.length > 0
					? currentQuery
							.delete('categoryId')
							.set('tags', filteredTags)
					: currentQuery.delete('categoryId').delete('tags');
			const correctQueryString = getStringifiedQueryFromObject(
				correctQuery.toJS(),
			);
			const correctBaseUrl = CategoryUtils.getCategoryUrl({
				category,
				paramLang: params.lang,
			});
			const correctUrl = `${CategoryUtils.getCategoryUrl({
				category,
				paramLang: params.lang,
			})}${
				correctQueryString.length > 0 ? '?' : ''
			}${correctQueryString}`;

			if (
				currentBaseUrl !== encodeURI(correctBaseUrl) ||
				correctQuery !== currentQuery
			) {
				return Promise.reject(redirect(correctUrl, true));
			}
		}

		return Promise.all([
			store.dispatch(fetchCities()),
			store.dispatch(
				fetchCategoriesByCityCodeWithDepth({
					cityCode,
					lang: params.lang,
				}),
			),
		]).then(() => {
			const state = store.getState();
			const citiesMap = StateUtils.getCitiesMap(state);
			if (!citiesMap.get(cityCode))
				return Promise.reject(
					notFound(`Couldn't find the City: ${cityCode}`),
				);
			return Promise.resolve();
		});
	});
};

const mapStateToProps = (state, ownProps) => {
	const { location, params } = ownProps;
	const { cityCode, categoryId } = CategoryUtils.getCityAndCategoryId({
		store: StateUtils.getMockStore(state),
		location,
		params,
	});
	const hasSuperCategories =
		!categoryId || Boolean(StateUtils.getCategory(state, categoryId));
	const isBot = StateUtils.isBot(state);

	const isSuperCategory =
		hasSuperCategories &&
		CategoryUtils.isSuperCategory({
			store: StateUtils.getMockStore(state),
			location,
			params,
		});
	return {
		cityCode,
		categoryId,
		hasSuperCategories,
		isSuperCategory,
		location,
		params,
		isBot,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchSuperCategories(cityCode, categoryId) {
		if (cityCode)
			dispatch(
				fetchCategoriesByCityCodeWithDepth({
					cityCode,
					lang: ownProps.params.lang,
				}),
			);
		else if (categoryId && cityCode)
			dispatch(
				fetchCategoriesByIdWithDepth({
					categoryId,
					depth: 1,
					lang: ownProps.params.lang,
				}),
			);
		else if (categoryId && !cityCode)
			dispatch(
				fetchCategoryAndCategoriesByCityCodeWithDepth({
					categoryId,
					depth: 1,
					lang: ownProps.params.lang,
				}),
			);
	},
	fetchCategory(cityCode, categoryId) {
		if (categoryId && !cityCode)
			dispatch(
				fetchCategoryAndCategoriesByCityCodeWithDepth({
					categoryId,
					depth: 0,
					lang: ownProps.params.lang,
				}),
			);
	},
});

export {
	getTitle,
	getAmpUrl,
	getCanonicalUrl,
	isNoIndex,
	getMetaDescription,
	getMetaTags,
	prePush,
	mapStateToProps,
	mapDispatchToProps,
};
