class PromoUtils {
	static getIsApplied(booking) {
		if (!booking) return null;
		return booking.getIn(['promoObject', 'isApplied']);
	}

	static getPromoCode(booking) {
		if (!booking) return null;
		return booking.getIn(['promoObject', 'promoCode']);
	}

	static getAppliedPromoCode(booking) {
		if (!booking) return null;
		return booking.getIn(['promoObject', 'appliedPromoCode']);
	}
}

export default PromoUtils;
