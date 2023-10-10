import { SALES_TRACKER_ID } from '../Constants/constants';
import KeyUtils from '../Utils/keyUtils';

const openChatPopUp = () => {
	window.LC_API.open_chat_window();
};

const trackLiveChatSales = customVariables => {
	window.LC_API.trigger_sales_tracker(SALES_TRACKER_ID, customVariables);
};
export const openChat = () => {
	if (window.LC_API && window.LC_API.open_chat_window) {
		openChatPopUp();
	}
};

export const openChatWithCustomMessage = _msg => {
	if (window.LC_API && window.LC_API.open_chat_window) {
		openChatPopUp();
	}
};

export const openChatWithCustomVariables = customVariables => {
	if (window && window.LC_API && window.LC_API.set_custom_variables) {
		window.LC_API.params = window.LC_API.set_custom_variables(
			customVariables,
		);
		window.LC_API.params = customVariables;
		openChatPopUp();
	}
};

const chatLoaded = () => {
	if (window.LC_API) {
		window.LC_API.on_before_load = () => {
			window.LC_API.hide_chat_window();
		};
	}
};

const triggerSalesTracking = customVariables => {
	if (window.LC_API) {
		window.LC_API.on_after_load = () => {
			trackLiveChatSales(customVariables);
		};
	}
};

const triggerOnChatWindowOpen = hideForm => {
	if (window.LC_API) {
		window.LC_API.on_chat_window_opened = () => {
			hideForm();
		};
		window.LC_API.on_after_load = () => {
			if (window.LC_API.chat_running()) {
				hideForm();
			}
		};
	}
};

const loadLiveChatScript = (
	isDelayed,
	trackSales,
	customVariables,
	isHelpPage,
	hideForm,
) => {
	const lc = document.createElement('script');
	lc.type = 'text/javascript';
	lc.defer = true;
	lc.src = 'https://cdn.livechatinc.com/tracking.js';
	const s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(lc, s);
	if (isDelayed) {
		lc.addEventListener('load', chatLoaded);
	}
	if (trackSales) {
		lc.addEventListener('load', () =>
			triggerSalesTracking(customVariables),
		);
	}
	if (isHelpPage) {
		lc.addEventListener('load', () => triggerOnChatWindowOpen(hideForm));
	}
};

export const loadChat = ({
	isDelayed,
	trackSales,
	customVariables,
	isHelpPage,
	hideForm,
	hideChatBubble,
}) => {
	/* eslint-disable */
	window.__lc = window.__lc || {};
	window.__lc.license = KeyUtils.getLiveChatLicenceKey();
	if (hideChatBubble) {
		window.LC_API = window.LC_API || {};
		window.livechat_chat_started = false;
		window.LC_API.on_before_load = function() {
			window.LC_API.hide_chat_window();
		};
		window.LC_API.on_chat_started = function() {
			window.livechat_chat_started = true;
		};
		window.LC_API.on_chat_window_minimized = function() {
			window.LC_API.hide_chat_window();
		};
		loadLiveChatScript(
			isDelayed,
			trackSales,
			customVariables,
			isHelpPage,
			hideForm,
		);
	} else if (!window.LC_API) {
		loadLiveChatScript(
			isDelayed,
			trackSales,
			customVariables,
			isHelpPage,
			hideForm,
		);
	}
};
