import { getCurrencyFromUrl, getLanguageFromUrl } from '../Utils/urlUtils';
import { browserHistory } from 'react-router';
import {
	hasValidCurrencyCode,
	hasValidLanguageCode,
} from '../Utils/bookingFlowUtils';
import EnvUtils from '../Utils/envUtils';
import { ACTIVE_LANGUAGE_CODES } from '../Constants/constants';

export const getPostRequest = (postData = {}) => ({
	method: 'POST',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(postData),
});

export const getPutRequest = (putData = {}) => ({
	method: 'PUT',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(putData),
});

export const getPatchRequest = (patchData = {}) => ({
	method: 'PATCH',
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	},
	body: JSON.stringify(patchData),
});

export const getApiLanguageParameter = currentLanguageCode => {
	const languageFromUrl =
		!EnvUtils.isServer() &&
		getLanguageFromUrl(browserHistory.getCurrentLocation());
	const languageCode = hasValidLanguageCode(
		languageFromUrl,
		currentLanguageCode,
	)
		? languageFromUrl
		: currentLanguageCode;
	const validatedLanguageCode = ACTIVE_LANGUAGE_CODES.includes(languageCode)
		? languageCode
		: '';
	return validatedLanguageCode ? `&language=${validatedLanguageCode}` : '';
};

export const getApiCurrencyParameter = currentCurrencyCode => {
	const currencyFromUrl =
		!EnvUtils.isServer() &&
		getCurrencyFromUrl(browserHistory.getCurrentLocation());
	const currencyCode = hasValidCurrencyCode(
		currencyFromUrl,
		currentCurrencyCode,
	)
		? currencyFromUrl
		: currentCurrencyCode;
	return currencyCode ? `&currency=${currencyCode}` : '';
};
