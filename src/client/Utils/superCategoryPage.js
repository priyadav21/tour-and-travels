import CategoryUtils from '../Utils/categoryUtils';

export const isNoIndex = pageInfo => {
	const category = CategoryUtils.getCategory(pageInfo);
	const { params } = pageInfo;
	return CategoryUtils.isNoIndex({ category, paramLang: params.lang });
};
