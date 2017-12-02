'use strict';

const BaseApiError = require('./ApiError');

class ApiValidationError extends BaseApiError {
	constructor(errors) {
		super("Validation failed", 400);
		this.validationErrors = errors;
	};

	toObject() {
		const object     = super.toObject();
		object['errors'] = this.validationErrors;
		return object;
	};
};

module.exports = ApiValidationError;