import moment from 'moment';
import ProductUtils from './productUtils';

class ReviewUtils {
	static getReviewsWithImageUrls(tgId, reviews) {
		if (!reviews) return null;

		return reviews
			.filter(review => !!review.get('content').length)
			.map((review, index) => {
				const n = ((tgId + index) % 200) + 1;
				return review.set(
					'reviewerImageUrl',
					`https://cdn-s3-open.touroxy.com/reviews/${n}.jpg`,
				);
			})
			.sortBy(r => r.get('reviewTime'))
			.reverse();
	}

	static getReviewsCount(reviews) {
		if (!reviews) return 0;

		return reviews.filter(review => !!review.get('content').length).size;
	}

	static getCanonicalURL({ product, paramLang }) {
		if (!product) return null;
		return ProductUtils.getCanonicalURL({ product, paramLang });
	}

	static isNoIndex({ product, reviews, paramLang }) {
		if (!product) return true;
		if (!reviews) return true;
		if (paramLang && paramLang.toUpperCase() !== 'EN') return true;
		if (ReviewUtils.getReviewsCount(reviews) < 15) return true;
		return product.get('noIndex');
	}

	static getSiteMapMetaData(product, reviews) {
		const {
			name,
			imageUploads: image,
			averageRating,
			reviewCount,
		} = product;
		const imageUrl = image.size
			? `https:${image.getIn([
					'0',
					'url',
			  ])}?auto=compress&w=768&h=480&fit=min`
			: '';

		return reviews
			.map(review => ({
				'@context': 'https://schema.org/',
				'@type': 'Review',
				itemReviewed: {
					'@type': 'Product',
					image: imageUrl,
					name,
					aggregateRating: {
						'@type': 'AggregateRating',
						ratingValue: averageRating,
						reviewCount,
					},
				},
				reviewRating: {
					'@type': 'Rating',
					ratingValue: review.get('rating'),
				},
				name: review.get('title'),
				author: {
					'@type': 'Person',
					name: review.get('nonCustomerName'),
				},
				datePublished: moment
					.unix(review.get('reviewTime') / 1000)
					.format('YYYY-MM-DD'),
				reviewBody: review.get('content'),
				publisher: {
					'@type': 'Organization',
					name: review.get('source'),
				},
			}))
			.toJS();
	}

	static getReviewsPageTitle(product) {
		if (!product) return null;
		return `Reviews - ${product.get(
			'name',
		)}, ${ProductUtils.getCityDisplayName(product)} - Touroxy`;
	}

	static getReviewsMetaDescription(product) {
		if (!product) return null;
		return `Find out what genuine customers are saying about booking ${product.get(
			'name',
		)} from Touroxy. Real reviews from real people to get insights before booking online.`; // eslint-disable-line max-len
	}

	static getReviewsFromStore(store, tourGroupId, filterType) {
		return store.getIn([
			'byTgIdAndFilter',
			this.evaluateReviewStoreKey(tourGroupId, filterType),
		]);
	}

	static setReviewsToStore(store, tourGroupId, filterType, reviews) {
		const reviewsMap = store.get('byTgIdAndFilter');
		return store.set(
			'byTgIdAndFilter',
			reviewsMap.set(
				this.evaluateReviewStoreKey(tourGroupId, filterType),
				reviews,
			),
		);
	}

	static evaluateReviewStoreKey(tourGroupId, filterType) {
		return `${tourGroupId}-${filterType}`;
	}
}

export default ReviewUtils;
