import EnvUtils from './envUtils';

const defer =
	(typeof window !== 'undefined' &&
		'requestIdleCallback' in window &&
		window.requestIdleCallback) ||
	(cb => window.setTimeout(cb, 1));

export default EnvUtils.isServer() ? () => {} : defer.bind(window);
