import {
	CITIES,
	COOKIE,
	NYC_CONCIERGE_SUPPORT_PHONE_NUMBER,
} from '../Constants/constants';
import BookingUtils from './bookingUtils';
import DateUtils from './dateUtils';
import PricingUtils from './pricingUtils';
import { ProfileType } from '../Models/user';

export const isAffiliate = cookies =>
	cookies && cookies.get(COOKIE.USER_PROFILE_TYPE) === ProfileType.AFFILIATE;

/**
 * @param pricing
 * @param booking
 * @returns {boolean} returns true if concierge should be allowed to book, false o.w
 */
export const shouldAllowBooking = (pricing, booking) => {
	const {
		selectedDate: date,
		selectedTime: time,
		selectedTourId: tourId,
	} = booking;
	const timeSlot = BookingUtils.getTimeSlot(pricing, { date, time, tourId });
	if (!timeSlot) return true;

	const { isLimited, seatsLeft } = timeSlot.get('availability');
	return !(isLimited && seatsLeft < 6);
};

/**
 * @param city
 * @returns {string} special phone number for concierges
 */
export const getPhoneNumber = city => {
	const { cityCode, phoneNumber } = city;
	if (cityCode === CITIES.NEW_YORK) return NYC_CONCIERGE_SUPPORT_PHONE_NUMBER;
	return phoneNumber;
};

/**
 * Opens concierge's mail client with booking request mail content pre filled
 * @param product Product which the concierge is trying to book
 * @param pricing pricing of the above product
 * @param booking Booking
 * @param city City of the product
 */
export const triggerBookingRequestMail = (product, pricing, booking, city) => {
	const { id, name } = product;
	const { displayName: cityName } = city;
	const {
		selectedDate: date,
		selectedTime: time,
		selectedTourId: tourId,
	} = booking;
	const tour = PricingUtils.getTour(pricing, tourId);
	const { name: variantName } = tour;
	const email = 'info@touroxy.com';
	const subject = `Booking required for ${name}, ${cityName}`;
	const tickets = BookingUtils.getPeopleDescription(booking);
	const body = encodeURIComponent(
		[
			`Product ID: ${id}\n`,
			`Product Name: ${name}\n`,
			`City: ${cityName}\n`,
			`Date: ${DateUtils.format(date, 'd mmm, yyyy')}\n`,
			`Time: ${DateUtils.formatTime(time)}\n`,
			`Variant: ${variantName}\n`,
			`Tickets: ${tickets}`,
		].join(''),
	);
	window.open(`mailto:${email}?subject=${subject}&body=${body}`);
};

export default {
	isAffiliate,
	shouldAllowBooking,
	getPhoneNumber,
	triggerBookingRequestMail,
};
