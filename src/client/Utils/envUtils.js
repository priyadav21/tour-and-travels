class EnvUtils {
	static isDevelopmentEnvironment() {
		return process.env.NODE_ENV === 'development';
	}

	static isTestingEnvironment() {
		return (
			process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'stage'
		);
	}

	static isProductionEnvironment() {
		return process.env.NODE_ENV === 'production';
	}

	static isServer() {
		return process.env.PLATFORM === 'server';
	}

	static isTestingViaJest() {
		return !!process.env.IS_JEST;
	}
}

export default EnvUtils;
