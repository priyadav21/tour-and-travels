import EnvUtils from './envUtils';

export const getSmartLookUrl = () => {
	if (EnvUtils.isServer()) {
		return null;
	}
	return window && window.smartlook && window.smartlook.playUrl;
};
