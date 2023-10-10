import EnvUtils from './envUtils';

/**
 * @deprecated use ReactCookie inside a specific util class instead
 * see ConciergeUtils.isConcierge()
 */
class CookieUtils {
	static getCookie(cname) {
		const cookie = document.cookie;
		const cnameCookie = cookie
			? cookie
					.split(';')
					.filter(entry => entry.split('=')[0].trim() === cname)[0]
			: null;
		return cnameCookie ? cnameCookie.split('=')[1].trim() : null;
	}

	static setCookie(cname, value) {
		if (!EnvUtils.isServer()) {
			document.cookie = `${cname}=${value};path='/'`;
		}
	}

	static getCityCookie(cookie) {
		const currentCityCodeCookie = cookie
			? cookie
					.split(';')
					.filter(
						entry =>
							entry.split('=')[0].trim() === 'currentCityCode',
					)[0]
			: null;
		return currentCityCodeCookie
			? currentCityCodeCookie.split('=')[1].trim()
			: null;
	}
}

export default CookieUtils;
