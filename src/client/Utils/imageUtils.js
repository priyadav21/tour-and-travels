import { CDN_IMGIX_BASE_SERVER } from '../Constants/constants';

class ImageUtils {
	// Some Imgix URls being called have prefxied Query Params. Remove them.
	static getSanitizedImgixUrl(url) {
		return url ? url.split('?')[0] : '';
	}

	/**
	 * Imgixify the url based on image tag/view width and height
	 * @param url image url
	 * @param width image tag/view width
	 * @param height image tag/view height
	 * @returns string Imgixified url with format and size params
	 */
	static getImgixImageUrlFixed(url, width, height, compression) {
		const urlCopy = this.getSanitizedImgixUrl(url).replace(
			'touroxy-s3.imgix.net',
			CDN_IMGIX_BASE_SERVER,
		);
		const w = width ? `&w=${width * 1.5}` : '';
		const h = height ? `&h=${height * 1.5}` : '';
		if (compression) {
			return `${urlCopy}?q=${compression}&fm=pjpg${w}${h}&fit=min&crop=faces`;
		}
		return `${urlCopy}?auto=compres&fm=pjpg${w}${h}&fit=min&crop=faces`;
	}

	// Add the Suffix to Image Url for imgix images
	static getImgixCompressedImageUrl(url) {
		const urlCopy = this.getSanitizedImgixUrl(url).replace(
			'touroxy-s3.imgix.net',
			CDN_IMGIX_BASE_SERVER,
		);
		// original w=326&h=190
		return `${urlCopy}?auto=compress&fit=min&fm=pjpg`;
	}

	static getImgixUrl({ url, height = null, width = null, quality = 100 }) {
		const urlCopy = this.getSanitizedImgixUrl(url).replace(
			'touroxy-s3.imgix.net',
			CDN_IMGIX_BASE_SERVER,
		);
		return `${urlCopy}?}&auto=format&h=${height || ''}&w=${width ||
			''}&crop=faces&fit=min&fm=jpeg&q=${quality || ''}`;
	}

	// Add the Suffix to Image Url for imgix images
	static getImgixImageUrl(url) {
		return this.getImgixImageUrlFixed(url, 336, 210);
	}

	static getImgixCarouselImageUrl(url) {
		return this.getImgixImageUrlFixed(url, 560, 321);
	}

	static getImgixCategoryCardImageUrl(url) {
		return this.getImgixImageUrlFixed(url, 266, 160);
	}

	static getCityCardImgixImageUrl(url) {
		return this.getImgixImageUrlFixed(url, 235, 138);
	}

	static getMidasProductImageUrl(url) {
		return this.getImgixImageUrlFixed(url, 512, 340);
	}

	static getLargerFacebookImage(width, height, imageUrl) {
		const regex = /\?type=large/g;
		const subst = `?width=${width}&height=${height}`;
		return imageUrl.replace(regex, subst);
	}
}

export default ImageUtils;
