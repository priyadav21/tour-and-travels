import requestAnimationFrame from './requestAnimFrameShimLayer';
/* eslint-disable */
// Get the top position of an element in the document
var getTop = function(element, start) {
	// return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
	if (element.nodeName === 'HTML') return -start;
	return element.getBoundingClientRect().top + start;
};

var getLeft = function(element, start) {
	if (element.nodeName === 'HTML') return -start;
	return element.getBoundingClientRect().left + start;
};
// ease in out function thanks to:
// http://blog.greweb.fr/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
var easeInOutCubic = function(t) {
	return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
};

// calculate the scroll position we should be in
// given the start and end point of the scroll
// the time elapsed from the beginning of the scroll
// and the total duration of the scroll (default 500ms)
var position = function(start, end, elapsed, duration) {
	if (elapsed > duration) return end;
	return start + (end - start) * easeInOutCubic(elapsed / duration); // <-- you can change the easing funtion there
	// return start + (end - start) * (elapsed / duration); // <-- this would give a linear scroll
};

// we use requestAnimationFrame to be called by the browser before every repaint
// if the first argument is an element then scroll to the top of this element
// if the first argument is numeric then scroll to this location
// if the callback exist, it is called when the scrolling is finished
// if context is set then scroll that element, else scroll window
const smoothScroll = function(
	el,
	duration,
	callback,
	context,
	horizontal = false,
	offset = 0,
) {
	duration = duration || 500;
	context = context || window;
	var start = horizontal
		? context.scrollLeft || window.pageXOffset
		: context.scrollTop || window.pageYOffset;

	if (typeof el === 'number') {
		var end = parseInt(el);
	} else {
		var end = horizontal ? getLeft(el, start) : getTop(el, start);
	}
	end -= offset;

	var clock = Date.now();
	var step = function() {
		var elapsed = Date.now() - clock;
		if (context !== window) {
			if (horizontal) {
				context.scrollLeft = position(start, end, elapsed, duration);
			} else {
				context.scrollTop = position(start, end, elapsed, duration);
			}
		} else {
			if (horizontal) {
				window.scroll(position(start, end, elapsed, duration), 0);
			} else {
				window.scroll(0, position(start, end, elapsed, duration));
			}
		}

		if (elapsed > duration) {
			if (typeof callback === 'function') {
				callback(el);
			}
		} else {
			requestAnimationFrame(step);
		}
	};
	step();
};

/* @deprecated */
export const scrollTo = (callback, scrollDuration = 150, toValue = 0) => {
	const scrollFrom = document.body.scrollTop;
	const scrollTo = toValue;
	const scrollDiff = scrollFrom - scrollTo;

	const oldTimestamp = performance.now();
	const step = newTimestamp => {
		const easeInOutQuad = t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

		const timeRatio = (newTimestamp - oldTimestamp) / scrollDuration;
		const easingFactor = easeInOutQuad(timeRatio);

		if (timeRatio >= 1) window.scrollTo(0, toValue);
		if (document.body.scrollTop === toValue) {
			if (callback) {
				callback();
			}
			return;
		}
		window.scrollTo(0, scrollFrom - scrollDiff * easingFactor);
		requestAnimationFrame(step);
	};
	requestAnimationFrame(step);
};

export const topPosition = domElement => {
	if (!domElement) {
		return 0;
	}
	return domElement.offsetTop + topPosition(domElement.offsetParent);
};

export const removeBodyScroll = remove => {
	if (remove === true) {
		document.body.style.overflow = 'hidden';
		document.body.style.top = `-${window.pageYOffset}px`; // done for safari browser in iphone
		document.body.style.position = 'fixed'; // done for safari browser in iphone
	} else {
		document.body.style.overflow = null;
		document.body.style.top = null;
		document.body.style.position = null;
	}
};

export default smoothScroll;
