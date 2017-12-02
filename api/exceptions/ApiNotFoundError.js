'use strict';

const BaseApiError = require('./ApiError');

class ApiNotFoundError extends BaseApiError {
	constructor() {
		super('not found', 404);
	};
};

module.exports = ApiNotFoundError;