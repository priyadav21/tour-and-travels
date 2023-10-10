class StringUtils {
	static getFirstName(fullName) {
		if (!fullName) return '';
		const name = fullName.trim();
		if (name && name.indexOf(' ') > -1) {
			return name.slice(0, name.indexOf(' '));
		}
		return name;
	}

	static getFirstLastName(fullName) {
		if (fullName) {
			return {
				firstName: fullName
					.split(' ')
					.slice(0, 1)
					.join(' '),
				lastName: fullName
					.split(' ')
					.slice(1)
					.join(' '),
			};
		}
		return {
			firstName: '',
			lastName: '',
		};
	}

	static capitalizeFirstLetter(str) {
		if (str) {
			return str
				.split(' ')
				.map(word => {
					const wordAsSmall = word.toLowerCase();
					return wordAsSmall
						? `${wordAsSmall[0].toUpperCase()}${wordAsSmall.slice(
								1,
						  )}`
						: '';
				})
				.join(' ');
		}
		return '';
	}

	static startsWith(str, prefixes) {
		if (str) {
			for (const prefix of prefixes) {
				if (str.startsWith(prefix)) return true;
			}
		}

		return false;
	}

	static stripNonIntegers(value) {
		return value.replace(/[^0-9]/g, '');
	}

	static replaceNotAlphaNumbericWithHyphen(text) {
		// replace non alpha numberic characters with space, then trim, then replace multiple spaces with one hyphen.
		return text
			.replace(/[^a-z0-9]/gi, ' ')
			.trim()
			.replace(/\s\s+/g, ' ')
			.replace(/\s/g, '-');
	}

	static truncateToWord(str, maxLength) {
		// trim the string to the maximum length
		let trimmedString = str.substr(0, maxLength);

		// re-trim if we are in the middle of a word
		if (trimmedString !== str) {
			trimmedString = trimmedString
				.substr(0, trimmedString.lastIndexOf(' '))
				.concat('...');
		}

		return trimmedString;
	}

	static joinScripts = scripts =>
		scripts.reduce(
			(script, allScripts) => `${allScripts} \n ${script}`,
			'',
		);
	static joinStyles = scripts =>
		scripts.reduce(
			(script, allScripts) => `${allScripts} \n ${script}`,
			'',
		);

	static joinWithDot(...params) {
		return params.join('.');
	}

	static getArrayFromString(arrayAsString) {
		if (!arrayAsString || !(typeof arrayAsString === 'string')) return [];
		return arrayAsString.split(',').filter(s => s);
	}

	static stripUnnecessaryDecimals(string) {
		return string.replace(/\.0+$/, '');
	}
}

export default StringUtils;
