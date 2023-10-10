import { getApiCDNBaseUrl, getBaseUrl, getWebPathString } from '../Utils/urlUtils';

class CityUtils {
	static getCityUrl = ({ city, paramLang, withBase = false }) => {
		const cityCode = city.get('cityCode').toLowerCase(); // ideally this should be there in every category model. but this is to support older models. like in search
		const langPrefix = paramLang ? `/${paramLang}` : '';
		return `${
			withBase ? getBaseUrl() : ''
		}${langPrefix}/cities/${getWebPathString(cityCode)}`;
	};

	static getDefaultCurrency = city =>
		city.hasIn(['country', 'currency', 'code']) &&
		city.getIn(['country', 'currency', 'code']);

	static getPhoneNumber = city => city.get('phoneNumber');

	static getCity = (citiesMap, cityCode) => citiesMap.get(cityCode);

	static getCityDisplayName = (citiesMap, cityCode) =>
		citiesMap.getIn([cityCode, 'displayName']);

	static getCityImage = (citiesMap, cityCode) =>
		citiesMap.getIn([cityCode, 'imageURL']);

	static getCitiesList = async () => {
		const url = `${getApiCDNBaseUrl({})}/api/v2/city/list`;

		return fetch(url)
			.then(response => response.json())
			.then(json => {
				return json;
			})
			.catch(err => {
				return err;
			});
	};
}

export default CityUtils;
