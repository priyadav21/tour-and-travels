import { CURRENCY_CODES } from 'Constants/constants';
import CityUtils from '../../Utils/cityUtils';
class Security {
	//Check if cookie is valid, matches again enum values
	static hasValidCityCode = async cityCode => {
		if (!cityCode) return true;

		const fetchCityCode = city => city.cityCode;

		return CityUtils.getCitiesList()
			.then(cities => cities.map(fetchCityCode))
			.then(citiesCodeList => citiesCodeList.includes(cityCode))
			.catch(false);
	};

	static hasValidCurrencyCode = async currentCurrency => {
		return currentCurrency
			? CURRENCY_CODES.includes(String(currentCurrency).toUpperCase())
			: true;
	};

	static hasValidCookie = async cookies => {
		// Safe check, if cookies aren't initialized.
		if (typeof cookies === 'undefined') return true;
		const { currentCurrency, currentCityCode } = cookies;

		// A city is valid, either is 2 condition :-  It hasn't been set yet or It exist in our enum values
		const validCityCode = Security.hasValidCityCode(currentCityCode);

		// A currency is valid, either is 2 condition :-  It hasn't been set yet or It exist in our enum values
		const validCurrencyCode = Security.hasValidCurrencyCode(
			currentCurrency,
		);

		const invalidCityCode = !(await validCityCode);
		const invalidCurrencyCode = !(await validCurrencyCode);

		if (invalidCityCode || invalidCurrencyCode)
			return Promise.resolve(false);
		return Promise.resolve(true);
	};
}
export default Security;
