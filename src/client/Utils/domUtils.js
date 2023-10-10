/* eslint-disable import/prefer-default-export */

export const getBookingHeaderHeight = () => {
	const headerNode = document.getElementsByClassName(
		'header-component-wrapper',
	)[0];
	return headerNode.offsetHeight;
};

export const getMobileHeaderHeight = () => {
	const headerNode = document.querySelector('.mobile-header');
	return headerNode.offsetHeight;
};

export const getFirstBookingUserFieldErrorNode = () =>
	document.getElementsByClassName('booking-user-field-error')[0];

export const checkIfClassNameExistsInList = (list = [], className) => {
	let result = false;
	list.forEach(node => {
		result = !!(
			node &&
			node.className &&
			String(node.className).trim() === className
		);
	});
	return result;
};

export const getNodeFromList = (list = [], className) => {
	let resultNode = null;
	list.forEach(node => {
		if (node && node.className && node.className.trim() === className) {
			resultNode = node;
		}
	});
	return resultNode;
};
