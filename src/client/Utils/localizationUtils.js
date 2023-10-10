import moment from 'moment';
//NOTE: Need to import locale here
import 'moment/locale/fr';
import 'moment/locale/es';
import 'moment/locale/de';
import 'moment/locale/it';
import 'moment/locale/pt';
import 'moment/locale/nl';
import 'moment/locale/zh-cn';
import { COOKIE } from '../Constants/constants';
import { strings } from '../Constants/strings';

export const initGlobalLocale = ({ lang, cookies }) => {
	const globalLang = lang || cookies.get(COOKIE.CONTENT_LANG);
	if (!globalLang) {
		return;
	}
	// Set language from moment JS
	if (globalLang === 'zh') {
		moment.locale('zh-cn');
	} else {
		moment.locale(globalLang);
	}
	// Set lang for react localization
	strings.setLanguage(globalLang);
};
