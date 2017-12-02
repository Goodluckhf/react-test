'use strict';

class ExtendableError extends Error {
	constructor(message) {
		super(message);
		this.name = this.constructor.name;
		if (typeof Error.captureStackTrace === 'function') {
			Error.captureStackTrace(this, this.constructor);
		} else { 
			this.stack = (new Error(message)).stack; 
		}
	}
};


class ApiError extends ExtendableError {
	constructor(error, status) {
		super(error);
		this.status = status;
	};

	toObject() {
		return {
			success : false,
			message : this.message,
			status  : this.status
		};
	};

	toJson() {
		return JSON.stringify(this.toObject());
	};
};

module.exports = ApiError;