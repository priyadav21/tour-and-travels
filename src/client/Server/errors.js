const redirect = (redirectUrl, permanently = false) => {
	const error = new Error(
		`moved ${permanently ? 'permanently ' : ''}to ${redirectUrl}`,
	);
	error.statusCode = permanently ? 301 : 303;
	error.redirectUrl = redirectUrl;
	return error;
};

const notFound = msg => {
	const error = new Error(msg);
	error.statusCode = 404;
	return error;
};

export { redirect, notFound };
