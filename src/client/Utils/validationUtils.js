import moment from 'moment';
import Raven from 'raven-js';
import { parsePhoneNumberFromString } from 'libphonenumber-js/mobile';
import {
	FIELD_DESCRIPTION,
	FIELD_ERROR,
	FIELD_NAME,
	MAX_LENGTH_FOR_PHONE_NUMBER,
	PAYMENT_FIELD_NAME,
	PAYMENT_METHOD,
	INVALID_PHONE_NUMBER_ERROR,
} from '../Constants/constants';
import { INPUT_FIELD_IDS } from '../Constants/inputFields';
import { strings } from '../Constants/strings';
import Gen from './gen';

export const UNKNOWN_ERROR =
	'Oops. Some error occurred. Try reloading the page';

export const checkCardDetail = (
	number,
	minLength,
	maxLength,
	minValue,
	maxValue,
) => {
	let isValid = true;
	const regex = /^\d+$/;
	isValid = isValid && regex.test(number);
	isValid = isValid && number.length >= minLength;
	isValid = isValid && number.length <= maxLength;
	if (minValue !== null) {
		isValid = isValid && Number(number) >= minValue;
	}
	if (maxValue !== null) {
		isValid = isValid && Number(number) <= maxValue;
	}
	return isValid;
};

export const isValidJP = id => {
	if (id.length !== 9) {
		return false;
	}
	const sig = id.substr(0, 8);
	const mod = id.substr(8, 1);
	return Number(sig) % 7 === Number(mod);
};
export const getCustomerCount = ({ selectionMap, groupSize }) =>
	selectionMap && selectionMap.size !== 0
		? selectionMap.valueSeq().reduce((people, total) => total + people)
		: groupSize;

export const getTotalPassengersFromBooking = booking => {
	const { selectionMap, groupSize } = booking;
	return getCustomerCount({ selectionMap, groupSize });
};

export const checkFullName = fullName => {
	const parts = fullName.trim().split(' ');
	const hasAtLeastTwoParts = parts.length >= 2;
	let hasAtLeastOneNonInitial = false;
	for (const part of parts) {
		if (part.length > 1) {
			hasAtLeastOneNonInitial = true;
			break;
		}
	}

	return hasAtLeastTwoParts && hasAtLeastOneNonInitial;
};

export const checkEmail = email => {
	const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line max-len
	return regex.test(email) && !email.endsWith('.con');
};

export const checkPhone = phone => {
	const regex = /^[-+ \d]+$/;
	return regex.test(phone);
};

export const checkAmount = amount => {
	const regex = /^[\d]+$/;
	return regex.test(amount) && Number(amount) > 0;
};

export const checkAlphaNumeric = value => {
	let trimmedValue;
	if (value) {
		trimmedValue = value.trim();
		const regex = /^[0-9a-zA-Z\s]+$/;
		return regex.test(trimmedValue);
	}
	return false;
};

/**
 * @param name the user field or just the name of the user field as an object
 * @returns {function} the validation function for that user field
 */
export const getUserFieldValidationFunc = ({ name }) => {
	switch (name) {
		case FIELD_NAME.NAME:
			return checkFullName;
		case FIELD_NAME.EMAIL:
			return checkEmail;
		case FIELD_NAME.PHONE:
			return checkPhone;
		case FIELD_NAME.WEIGHT:
			return Gen.isEmptyString;
		default:
			return Gen.isEmptyString;
	}
};

export const validatePaymentField = (name, value) => {
	switch (name) {
		case PAYMENT_FIELD_NAME.CARD_HOLDER_NAME:
			return Gen.isEmptyString(value);
		case PAYMENT_FIELD_NAME.CARD_NUMBER:
			return checkCardDetail(value, 1, 19, null, null);
		case PAYMENT_FIELD_NAME.MONTH:
			return checkCardDetail(value, 1, 2, 1, 12);
		case PAYMENT_FIELD_NAME.YEAR:
			return checkCardDetail(value, 2, 2, 16, 99);
		case PAYMENT_FIELD_NAME.CVV:
			return checkCardDetail(value, 3, 4, null, null);
		default:
			return Gen.isEmptyString(value);
	}
};

/**
 * @param name the user field or just the name of the user field as an object
 * @returns {string} the error message for that user field
 */
export const getUserFieldErrorMessage = ({ name }) => {
	switch (name) {
		case FIELD_NAME.NAME:
			return FIELD_ERROR.NAME;
		case FIELD_NAME.EMAIL:
			return FIELD_ERROR.EMAIL;
		case FIELD_NAME.PHONE:
			return FIELD_ERROR.PHONE;
		case FIELD_NAME.WEIGHT:
			return FIELD_ERROR.WEIGHT;
		default:
			return 'Please enter a valid value';
	}
};

export const getUserFieldDescription = ({ name }) => {
	switch (name) {
		case FIELD_NAME.PHONE:
			return FIELD_DESCRIPTION.PHONE;
		default:
			return '';
	}
};

export const getUserFieldType = ({ name }) => {
	switch (name) {
		case FIELD_NAME.EMAIL:
			return 'email';
		case FIELD_NAME.PHONE:
			return 'tel';
		case FIELD_NAME.WEIGHT:
			return 'number';
		default:
			return 'text';
	}
};

export const getFieldId = ({ name }) => {
	switch (name) {
		case FIELD_NAME.EMAIL:
			return INPUT_FIELD_IDS.USER_FIELD_EMAIL;
		case FIELD_NAME.PHONE:
			return INPUT_FIELD_IDS.USER_FIELD_PHONE;
		case PAYMENT_FIELD_NAME.CARD_HOLDER_NAME:
			return INPUT_FIELD_IDS.PAYMENT_FIELD_CARD_NAME;
		case PAYMENT_FIELD_NAME.CARD_NUMBER:
			return INPUT_FIELD_IDS.PAYMENT_FIELD_CARD_NUMBER;
		case PAYMENT_FIELD_NAME.MONTH:
			return INPUT_FIELD_IDS.PAYMENT_FIELD_EXP_MONTH;
		case PAYMENT_FIELD_NAME.YEAR:
			return INPUT_FIELD_IDS.PAYMENT_FIELD_EXP_YEAR;
		case PAYMENT_FIELD_NAME.CVV:
			return INPUT_FIELD_IDS.PAYMENT_FIELD_CVV;
		default:
			return '';
	}
};

export const getUserFieldAutocompleteText = ({ name }) => {
	switch (name) {
		case FIELD_NAME.NAME:
			return 'name';
		case FIELD_NAME.EMAIL:
			return 'email';
		case FIELD_NAME.PHONE:
			return 'tel';
		default:
			return '';
	}
};

export const getPaymentFieldErrorMessage = name => {
	switch (name) {
		case PAYMENT_FIELD_NAME.CARD_HOLDER_NAME:
			return 'Please enter a valid card holder name';
		case PAYMENT_FIELD_NAME.CARD_NUMBER:
			return 'Please enter a valid card number';
		case PAYMENT_FIELD_NAME.MONTH:
			return 'Invalid month';
		case PAYMENT_FIELD_NAME.YEAR:
			return 'Invalid year';
		case PAYMENT_FIELD_NAME.CVV:
			return 'Invalid CVV';
		default:
			return '';
	}
};

const isNumberExcludedFromValidation = (phoneNumber, startsWith, minDigits) => {
	Raven.captureMessage(INVALID_PHONE_NUMBER_ERROR, {
		extra: {
			countryCode: startsWith,
			phoneNumber,
			Reason: 'Specific Country Issue',
		},
	});
	return !!(
		phoneNumber.startsWith(startsWith) &&
		phoneNumber.length >= minDigits &&
		phoneNumber.length <= MAX_LENGTH_FOR_PHONE_NUMBER
	);
};

export const checkPhoneNumberValidity = field => {
	const { value, countryDialCode, phoneNumber } = field;
	if (phoneNumber && !value && !countryDialCode) {
		return true;
	}

	if (value === countryDialCode || !countryDialCode || !value) {
		Raven.captureMessage(INVALID_PHONE_NUMBER_ERROR, {
			extra: {
				countryCode: countryDialCode,
				phoneNumber: value,
				Reason: 'Incomplete Number',
			},
		});
		return false;
	}
	if (value.length >= 18 || value.length <= countryDialCode.length) {
		Raven.captureMessage(INVALID_PHONE_NUMBER_ERROR, {
			extra: {
				countryCode: countryDialCode,
				phoneNumber: value,
				Reason: 'Out of Range, Incomplete Number',
			},
		});
		return false;
	}
	const unformattedValue = value.replace(/\D+/g, '');

	// Indian Exception for number starting with 6
	if (isNumberExcludedFromValidation(unformattedValue, '916', 10)) {
		return true;
	}

	// Argentina Exception
	if (isNumberExcludedFromValidation(unformattedValue, '54', 10)) {
		return true;
	}

	if (value && parsePhoneNumberFromString(String(value))) {
		if (!parsePhoneNumberFromString(String(value)).isValid()) {
			Raven.captureMessage(INVALID_PHONE_NUMBER_ERROR, {
				extra: {
					countryCode: countryDialCode,
					phoneNumber: value,
					Reason: 'libphonenumber Library Validation',
				},
			});
		}
		return parsePhoneNumberFromString(String(value)).isValid();
	}
	return true;
};

export const validateUserFieldsInBookingData = booking => {
	const { userFields } = booking;
	const errorsArray = [];
	userFields.forEach(user => {
		user.forEach(field => {
			const {
				value: fieldValue,
				name: fieldName,
				countryDialCode,
				unFormattedValue,
			} = field;
			const fieldId = getFieldId(field);
			const validationFunc = getUserFieldValidationFunc(field);
			const errorMsg = getUserFieldErrorMessage(field);
			const error = (fieldValue && fieldName === 'PHONE'
			? checkPhoneNumberValidity({
					value: unFormattedValue,
					countryDialCode,
					phoneNumber: fieldValue,
			  })
			: validationFunc(fieldValue))
				? ''
				: errorMsg;
			if (error) {
				const isValid = !error;
				errorsArray.push({ isValid, error, fieldId });
			}
		});
	});
	if (errorsArray.length) {
		// for now send first error
		return errorsArray[0];
	}
	return {
		isValid: true,
		fieldId: '',
		error: '',
	};
};

export const validatePromoCodeInBookingData = _booking => ({
	isValid: true,
	error: '',
});

export const validateCardDetailsInBookingData = ({
	cardHolderName,
	cardNumber,
	month,
	year,
	cvv,
}) => {
	const numberError = () =>
		checkCardDetail(cardNumber, 1, 19, null, null)
			? ''
			: 'Please enter a valid card number';
	const monthError = () =>
		checkCardDetail(month, 1, 2, 1, 12)
			? ''
			: 'Please enter a valid month for card expiry';
	const yearError = () =>
		checkCardDetail(year, 2, 2, 17, 99)
			? ''
			: 'Please enter a valid year for card expiry';
	const cvvError = () =>
		checkCardDetail(cvv, 3, 4, null, null)
			? ''
			: 'Please enter a valid CVV';
	const nameError = () =>
		cardHolderName && cardHolderName.length > 0
			? ''
			: 'Please enter Card Holder Name';
	const error =
		numberError() ||
		monthError() ||
		yearError() ||
		cvvError() ||
		nameError();
	const isValid = !error;
	return { isValid, error };
};

export const validateBookingDataOnSelectPage = booking => {
	const bookingError = () => (booking ? '' : UNKNOWN_ERROR);
	const bookingIdError = () => (booking.get('id') ? '' : UNKNOWN_ERROR);
	const tourIdError = () =>
		booking.get('selectedTourId') ? '' : 'Please select a valid variant';
	const dateError = () =>
		booking.get('selectedDate') ? '' : 'Please select a valid date';
	const timeError = () =>
		booking.get('selectedTime') ? '' : 'Please select a valid time';
	const error =
		bookingError() ||
		bookingIdError() ||
		tourIdError() ||
		dateError() ||
		timeError();
	const isValid = !error;
	return { isValid, error };
};

export const validateBookingDetails = booking => {
	const bookingError = () => (booking ? '' : UNKNOWN_ERROR);
	const numberOfTixError = () =>
		getTotalPassengersFromBooking(booking) > 0
			? ''
			: 'Please select at least one ticket to continue.';

	const userFieldsError = () => {
		const userFieldsValidity = validateUserFieldsInBookingData(booking);
		return userFieldsValidity.isValid ? '' : userFieldsValidity.error;
	};
	const promoCodeError = () => {
		const promoCodeValidity = validatePromoCodeInBookingData(booking);
		return promoCodeValidity.isValid ? '' : promoCodeValidity.error;
	};

	const error =
		bookingError() ||
		numberOfTixError() ||
		userFieldsError() ||
		promoCodeError();

	const isValid = !error;
	return { isValid, error };
};

export const validateBookingDataOnCheckoutPage = ({
	booking,
	paymentCard,
	finalPrice,
	paymentMethod = PAYMENT_METHOD.CARD,
	maxNumber,
}) => {
	const bookingError = () => (booking ? '' : UNKNOWN_ERROR);
	const numberOfTixError = () =>
		getTotalPassengersFromBooking(booking) > 0
			? ''
			: 'Please select at least one ticket to continue.';

	const maxNumberOfBookingError = () =>
		getTotalPassengersFromBooking(booking) > maxNumber
			? strings.formatString(strings.CPUD_ERROR_MAX_PAX, maxNumber)
			: '';
	const userFieldsError = () => {
		const userFieldsValidity = validateUserFieldsInBookingData(booking);
		return userFieldsValidity.isValid ? '' : userFieldsValidity.error;
	};
	const promoCodeError = () => {
		const promoCodeValidity = validatePromoCodeInBookingData(booking);
		return promoCodeValidity.isValid ? '' : promoCodeValidity.error;
	};
	const paymentDetailsError = () => {
		if (finalPrice === 0 || paymentMethod !== PAYMENT_METHOD.CARD)
			return '';
		const cardValidity = validateCardDetailsInBookingData(paymentCard);
		return cardValidity.isValid ? '' : cardValidity.error;
	};

	const error =
		bookingError() ||
		numberOfTixError() ||
		maxNumberOfBookingError() ||
		userFieldsError() ||
		promoCodeError() ||
		paymentDetailsError();

	const isValid = !error;
	return { isValid, error };
};

export const validateBookingData = ({
	booking,
	paymentCard,
	finalPrice,
	paymentMethod = PAYMENT_METHOD.CARD,
	maxNumber,
}) => {
	const selectPageError = () => {
		const selectPageValidity = validateBookingDataOnSelectPage(booking);
		return selectPageValidity.isValid ? '' : selectPageValidity.error;
	};
	const checkoutPageError = () => {
		const checkoutPageValidity = validateBookingDataOnCheckoutPage({
			booking,
			paymentCard,
			finalPrice,
			paymentMethod,
			maxNumber,
		});
		return checkoutPageValidity.isValid ? '' : checkoutPageValidity.error;
	};
	const error = selectPageError() || checkoutPageError();
	const isValid = !error;
	return { isValid, error };
};

export const validateDate = dateString => {
	const dateMoment = moment(dateString, 'YYYY-MM-DD');
	const yesterdayMoment = moment()
		.subtract(1, 'days')
		.startOf('day');
	return (
		dateMoment.isValid() && dateMoment.isSameOrAfter(yesterdayMoment, 'd')
	);
};

export const validateTime = timeString =>
	moment(timeString, 'HH:mm:ss').isValid() ||
	moment(timeString, 'HH:mm').isValid();

export const isValidAmount = amount => {
	const regex = /^\d*(\.\d{0,2})?$/;
	return regex.test(amount);
};

export const parseValidatedAmount = (validatedAmount, scale) => {
	if (validatedAmount) {
		return scale === 2
			? parseFloat(validatedAmount).toFixed(2)
			: Math.floor(validatedAmount).toString();
	}
	return '';
};

export const isParsedAmountValid = (parsedAmount, scale) => {
	const regex = scale === 2 ? /^[0-9]\d*((\.\d{0,2})?)$/ : /^[1-9][0-9]*$/;
	return parsedAmount && regex.test(parsedAmount);
};
