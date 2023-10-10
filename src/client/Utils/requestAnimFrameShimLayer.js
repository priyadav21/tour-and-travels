import EnvUtils from './envUtils';

const requestAnimFrame = () => {
	const shimFunc = (callback, _element) => {
		window.setTimeout(callback, 1000 / 60);
	};
	return (
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		shimFunc
	);
};

export default EnvUtils.isServer() ? () => {} : requestAnimFrame.bind(window)();
