import * as storejs from 'store';
import { fromJS, Map } from 'immutable';
import { STORE_ENTITY_TYPE } from '../Constants/constants';

const Raven =
	process.env.PLATFORM === 'server'
		? {
				captureException: () => {},
		  }
		: require('raven-js');

class LocalStore {
	static isEnabled() {
		return storejs.enabled;
	}

	static clear() {
		if (LocalStore.isEnabled) {
			storejs.clear();
		}
	}

	static read(key, defaultVal = null) {
		if (LocalStore.isEnabled()) {
			return storejs.get(key, defaultVal);
		}
		return null;
	}

	static write(key, value) {
		if (LocalStore.isEnabled()) {
			try {
				storejs.set(key, value);
			} catch (e) {
				LocalStore.clear();
				Raven.captureException(
					new Error('Local Store overflowed and cleared'),
				);
			}
		}
	}

	static remove(key) {
		if (LocalStore.read(key) !== null) {
			storejs.remove(key);
		}
	}

	static getAllBookingsFromStore() {
		const bookings = LocalStore.read(STORE_ENTITY_TYPE.BOOKINGS);
		if (bookings) {
			const bookingsMap = {};
			for (const bookingId of bookings) {
				bookingsMap[bookingId] = bookings[bookingId];
			}
			return fromJS(bookingsMap);
		}
		return new Map({});
	}
}

export default LocalStore;
