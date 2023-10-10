import EnvUtils from './envUtils';

class LogUtils {
	static log(...printStatement) {
		if (this.isLogEnabled() && EnvUtils.isDevelopmentEnvironment()) {
			console.log(...printStatement); // eslint-disable-line no-console
		}
	}

	static warn(...printStatement) {
		if (this.isLogEnabled() && !EnvUtils.isProductionEnvironment()) {
			console.warn(...printStatement); // eslint-disable-line no-console
		}
	}

	static logWithTime(...printStatement) {
		LogUtils.log(...printStatement, new Date().getTime());
	}

	static error(...err) {
		if (EnvUtils.isServer() && !EnvUtils.isDevelopmentEnvironment()) {
			// TODO: log the error in sentry
		} else {
			console.error(...err); // eslint-disable-line no-console
		}
	}

	static isLogEnabled() {
		return process.env.LOG === 'enable';
	}
}

export default LogUtils;
