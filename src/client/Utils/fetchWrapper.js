import 'isomorphic-fetch';
import resolveResponse from './resolveResponse';
// import PaperTrail from 'IsomorphicServer/paperTrail';

const FETCH_PARAMS = {
	credentials: 'include',
};

const fetchWrapper = (source, options = {}) =>
	fetch(source, Object.assign({}, FETCH_PARAMS, options))
		.then(response => {
			// If code running on node, and api status code >400, then log error
			if (
				response.status >= 400 &&
				typeof process !== 'undefined' &&
				!process.browser
			) {
				const strigifiedOptions = JSON.stringify(options);
				const errorLog = `[API REQUEST FAILED] [${response.status}] - ${source} - ${strigifiedOptions}`;

				// PaperTrail.logAPIRequest(errorLog);
			}

			return resolveResponse(response);
		})
		.catch(err => Promise.reject(err));

export default fetchWrapper;
