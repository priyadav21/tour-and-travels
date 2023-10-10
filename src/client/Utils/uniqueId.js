class UniqueId {
	constructor(sandboxIdBase64Encoded) {
		this.value = btoa(sandboxIdBase64Encoded);
	}

	getBase64EncodedValue() {
		return atob(this.value);
	}
}

export default UniqueId;
