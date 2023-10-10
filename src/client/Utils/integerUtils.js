class IntegerUtils {
	static isBitSet(n, index) {
		return (n & (1 << index)) !== 0;
	}

	static numberOfSetBits(n) {
		let count = 0;
		let copyN = n;
		while (copyN !== 0) {
			copyN &= copyN - 1;
			count++;
		}
		return count;
	}

	/*
	Convets string into 32 bit umber
	* */
	static hashCode(str) {
		let hash = 0;
		if (str.length === 0) return hash;
		for (let i = 0; i < str.length; i++) {
			const char = str.charCodeAt(i);
			hash = (hash << 5) - hash + char;
			hash &= hash; // Convert to 32bit integer
		}
		return Math.abs(hash);
	}

	static intInRangeFromString(string, min, max) {
		const numberFromString = this.hashCode(string);
		return (numberFromString % (max - min)) + min;
	}
}

export default IntegerUtils;
