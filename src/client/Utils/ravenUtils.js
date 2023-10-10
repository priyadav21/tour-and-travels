import Raven from 'raven-js';
import PlatformUtils from './platformUtils';
import { NODE_ENV } from '../Constants/constants';

class RavenUtils {
	static init() {
		Raven.config(RavenUtils.getClientDSN(PlatformUtils.deviceType()), {
			logger: 'logger',
			autoBreadcrumbs: {
				xhr: true, // XMLHttpRequest
				console: false, // console logging
				dom: true, // DOM interactions, i.e. clicks/typing
				location: true, // url changes, including pushState/popState
			},
			environment: process.env.NODE_ENV,
			release: process.env.RELEASE_VERSION,
			shouldSendCallback: () => process.env.NODE_ENV !== NODE_ENV.DEV,
			ignoreUrls: [/https?:\/\/(www\.)?localhost\.com/],
		}).install();
	}

	static getClientDSN(deviceType) {
		if (deviceType === 'MOBILE') {
			if (process.env.NODE_ENV === 'production') {
				return '';
			}
			return '';
		}
		if (process.env.NODE_ENV === 'production') {
			return '';
		} else if (process.env.NODE_ENV === 'test') {
			return '';
		}
		return '';
	}

	static getServerDSN() {
		if (process.env.NODE_ENV === 'production') {
			return '';
		}
		return '';
	}
}

export default RavenUtils;
