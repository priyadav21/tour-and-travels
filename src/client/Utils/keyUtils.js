import EnvUtils from './envUtils';
import {
	AMPLITUDE_KEY,
	APPBOY_KEY_DEV,
	APPBOY_KEY_PROD,
	DEVICE_TYPE,
	FEEFO_KEY,
	GA_KEY_DEV,
	GA_KEY_PROD,
	GCLOUD_KEY,
	GOOGLE_AUTH_CLIENT_ID,
	GTM_KEY_DEV,
	GTM_KEY_EXT,
	GTM_KEY_PROD,
	PAPERTRAIL_CONFIG,
	SEGMENT_KEY_DEV,
	SEGMENT_KEY_PROD,
	VERO_KEY_DEV,
	VERO_KEY_PROD,
	LIVE_CHAT_LICENCE_KEY,
	SMARTLOOK_KEY,
} from '../Constants/constants';

class KeyUtils {
	static getSegmentKey = (deviceType = DEVICE_TYPE.DESKTOP) => {
		if (EnvUtils.isProductionEnvironment()) {
			return SEGMENT_KEY_PROD[deviceType];
		}
		return SEGMENT_KEY_DEV[deviceType];
	};

	static getGAKey = (deviceType = DEVICE_TYPE.DESKTOP) => {
		if (EnvUtils.isProductionEnvironment()) {
			return GA_KEY_PROD[deviceType];
		}
		return GA_KEY_DEV[deviceType];
	};

	static getAdWordsIdMCC = () => {
		if (EnvUtils.isProductionEnvironment()) {
			return '';
		}
		return '';
	};

	static getAdWordsIdNY = () => {
		if (EnvUtils.isProductionEnvironment()) {
			return '';
		}
		return '';
	};

	static getFBAppId = () => {
		if (EnvUtils.isProductionEnvironment()) {
			return '';
		} else if (EnvUtils.isTestingEnvironment()) {
			return '';
		}
		return '';
	};

	static getFBPageId = () => {
		if (EnvUtils.isProductionEnvironment()) {
			return '';
		} else if (EnvUtils.isTestingEnvironment()) {
			return '';
		}
		return '';
	};

	static getGoogleAppClientId = () => GOOGLE_AUTH_CLIENT_ID;

	static getAppboyApiKey = (deviceType = DEVICE_TYPE.DESKTOP) => {
		if (EnvUtils.isProductionEnvironment()) {
			return APPBOY_KEY_PROD[deviceType];
		}
		return APPBOY_KEY_DEV[deviceType];
	};

	static getFeefoKey = () => {
		if (EnvUtils.isProductionEnvironment()) {
			return FEEFO_KEY;
		}
		return '';
	};

	static getSmartLookKey = () => SMARTLOOK_KEY;

	static getGTMKey = (deviceType = DEVICE_TYPE.DESKTOP) => {
		if (EnvUtils.isProductionEnvironment()) {
			return GTM_KEY_PROD[deviceType];
		}
		return GTM_KEY_DEV[deviceType];
	};

	static getExternalGTMKey = host => {
		switch (host) {
			case 'book.ssa.co.uk':
				return GTM_KEY_EXT.LTD;
			default:
				return null;
		}
	};

	static getAmplitudeKey = () => {
		if (EnvUtils.isProductionEnvironment()) {
			return AMPLITUDE_KEY.PROD;
		}
		return AMPLITUDE_KEY.SANDBOX;
	};

	static getVeroKey = (deviceType = DEVICE_TYPE.DESKTOP) => {
		if (EnvUtils.isProductionEnvironment()) {
			return VERO_KEY_PROD[deviceType];
		}
		return VERO_KEY_DEV[deviceType];
	};

	static getGCloudApiKey = () => {
		if (EnvUtils.isProductionEnvironment()) {
			return GCLOUD_KEY.PROD;
		} else if (EnvUtils.isTestingEnvironment()) {
			return GCLOUD_KEY.TEST;
		}
		return GCLOUD_KEY.DEV;
	};

	static getPaperTrailConfig = () => PAPERTRAIL_CONFIG;

	static getLiveChatLicenceKey = () => LIVE_CHAT_LICENCE_KEY;
}

export default KeyUtils;
