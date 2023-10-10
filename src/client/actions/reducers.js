import { combineReducers } from 'redux-immutable';
import { applePayStore } from './applePay';
import { banners } from './banner';
import { bookings, checkoutExtraInformation, seatSVGs } from './booking';
import { categoryStore, subCategories } from './category';
import { city, cityReducer } from './city';
import { currencies } from './currency';
import { faqStore } from './faq';
import { fetchingStatus, fetchStore } from './fetch';
import {
	orderDetails,
	orderStatus,
	orderStatusConfirmation,
} from './orderStatus';
import { page } from './page';
import { paymentCard } from './paymentCard';
import { pricingStore } from './pricing';
import { productStore, similarProductStore } from './product';
import { productList } from './productList';
import { referralStore } from './referral';
import { reviewStore } from './review';
import { searchResults } from './search';
import { serverStatus } from './serverStatus';
import { slotsStore } from './slots';
import { thunkErrorStore } from './thunkErrors';
import { ugcUploads } from './ugcUploads';
import { userStore } from './user';
import { deviceStore } from './device';
import { languageReducer } from './language';
import { wishlistStore } from './wishlist';
import { ticketStore } from './ticket';
import { userGeoLocation } from './userGeoLocation';
import { paymentGatewayStore } from './paymentGateway';
import { gtm } from './gtm';
import { domainConfig } from './domainConfig';
import { selectedSeatsValidationDetails } from './selectedSeatsValidation';

const rootReducer = combineReducers({
	city,
	page,
	productList,
	banners,
	currencies,
	domainConfig,
	bookings,
	paymentCard,
	seatSVGs,
	fetchingStatus,
	searchResults,
	user: userStore,
	similarProductStore,
	subCategories,
	orderStatus,
	orderDetails,
	serverStatus,
	orderStatusConfirmation,
	paymentGatewayDetails: paymentGatewayStore,
	cityStore: cityReducer,
	languageStore: languageReducer,
	deviceStore,
	productStore,
	categoryStore,
	ticketStore,
	wishlistStore,
	pricingStore,
	referralStore,
	faqStore,
	reviewStore,
	fetchStore,
	slotsStore,
	applePayStore,
	checkoutExtraInformation,
	thunkErrorStore,
	ugcUploads,
	userGeoLocation,
	gtm,
	selectedSeatsValidationDetails,
});

export default rootReducer;
