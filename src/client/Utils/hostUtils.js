import EnvUtils from '../Utils/envUtils';
import { isAffiliate } from '../Utils/conciergeUtils';
import { TOUROXY_DOMAIN } from '../Constants/constants';

export const showPoweredByLogo = ({ host }) => {
	const subdomain = host.split('.')[0];
	switch (subdomain) {
		case 'margotickets':
		case 'evanevans':
			return true;
		default:
			return false;
	}
};

export const getWhitelistedCategoryIds = ({ host }) => {
	const subdomain = host.split('.')[0];
	switch (subdomain) {
		case 'margotickets':
		case 'evanevans':
			return ['167'];
		default:
			return null;
	}
};

export const showCategories = ({ host }) =>
	!getWhitelistedCategoryIds({ host });

export const getWhitelistedCategoryUrl = ({ host }) => {
	const whitelistedCategoryIds = getWhitelistedCategoryIds({ host });
	if (whitelistedCategoryIds) {
		return `/category/${whitelistedCategoryIds[0]}/`;
	}
	return null;
};

export const getRedirectUrlForRestrictedDomain = ({ host }) => {
	const subdomain = host.split('.')[0];
	switch (subdomain) {
		case 'book':
			return `http://${host.replace('book.', 'www.')}`;
		case 'barcelonapass':
			return 'https://www.barcelonapass.com/';
		default:
			return null;
	}
};

export const getTermsLink = ({ host }) => {
	switch (host) {
		case 'book.tickets.co.uk':
			return 'https://tickets.co.uk/terms-conditions/';
		default:
			return '/terms-of-use';
	}
};

export const getPrivacyPolicyLink = ({ host }) => {
	switch (host) {
		case 'book.tickets.co.uk':
			return 'https://tickets.co.uk/privacy-policy/';
		default:
			return '/privacy-policy';
	}
};

export const isWhitelabel = ({ host }) => {
	switch (host) {
		case 'www.localhost.com':
		case 'www.test-touroxy.com':
		case 'www.stage-touroxy.com':
		case 'www.touroxy.com': {
			return false;
		}
		default:
			return true;
	}
};

export const isExternalWhitelabel = ({ host }) => {
	switch (host) {
		case 'dsdsd.touroxy.com':
		case 'dsd.touroxy.com':
		case 'dsd.touroxy.com':
			return true;
		default:
			return false;
	}
};

export const isNonTouroxyWhitelabel = ({ host }) =>
	!(host.includes('touroxy') || host.includes('localhost')) ||
	isExternalWhitelabel({ host });

export const showCashbackInfoSection = (cookies, host) =>
	!isAffiliate(cookies) && !isExternalWhitelabel({ host });

export const showTermsSection = ({ host }) =>
	!isNonTouroxyWhitelabel({ host }) || host === 'book.tickets.co.uk';

export const showUserSubscriptionCheckbox = ({ host }) =>
	host === 'book.tickets.co.uk' || !EnvUtils.isProductionEnvironment();

export const showGoogleLoginButton = ({ host }) => {
	if (!isWhitelabel({ host })) {
		return true;
	}
	switch (host) {
		case 'book.tickets-barcelona.org':
			return true;
		default:
			return false;
	}
};

export const getBaseHostName = ({ host }) =>
	host
		.split('.')
		.slice(1)
		.join('.');

export const checkNoIndex = ({ host, isNoIndex }) =>
	host !== TOUROXY_DOMAIN || isNoIndex;
