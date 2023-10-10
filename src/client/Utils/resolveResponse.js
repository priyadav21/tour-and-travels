const UNKNOWN = 'Unknown error occurred. Try again in some time.';
const REQUEST_TIMED_OUT = 'Request took too long. Try again in some time.';

const makeError = (response, message, code = null) => {
	const error = new Error(message);
	error.url = response.url;
	error.status = response.status;
	error.code = code || `STATUS-${response.status}`;
	error.message = message;
	return error;
};

const resolveResponse = response => {
	const { status } = response;
	if (response.ok) {
		return Promise.resolve(response);
	}
	if (
		response.url.indexOf(process.env.API_BASE_URL) === 0 ||
		response.url.indexOf(process.env.API_CDN_BASE_URL) === 0
	) {
		if (status === 404) {
			return Promise.reject(makeError(response, 'Not Found'));
		} else if (status === 504) {
			return Promise.reject(makeError(response, REQUEST_TIMED_OUT));
		}
		return response
			.json()
			.catch(() => Promise.reject(makeError(response, UNKNOWN)))
			.then(errJson => {
				const { error } = errJson;
				if (error && error.code !== 'CAL-0000') {
					return Promise.reject(
						makeError(response, error.message, error.code),
					);
				}
				return Promise.reject(makeError(response, UNKNOWN));
			});
	}
	return Promise.reject(makeError(response, UNKNOWN));
};

export default resolveResponse;
