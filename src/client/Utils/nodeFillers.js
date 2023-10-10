/* eslint-disable func-names */

(function() {
	global.Buffer = global.Buffer || require('buffer').Buffer; // eslint-disable-line global-require

	if (typeof btoa === 'undefined') {
		global.btoa = function(str) {
			return new Buffer(str).toString('base64');
		};
	}

	if (typeof atob === 'undefined') {
		global.atob = function(b64Encoded) {
			return new Buffer(b64Encoded, 'base64').toString();
		};
	}
})();
