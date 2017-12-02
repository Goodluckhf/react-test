'use strict';

const Validator       = require('better-validator');
const ValidationError = require('./exceptions/ApiValidationError');

class Api {

	validate(params, rules) {
		const validator = new Validator();
		const errors    = validator(params, rules);
		console.log(errors);
		if (errors && errors.length > 0) {
			throw new ValidationError(errors);
		}
	};

	buildAnswer(data) {
		return {
			success : true,
			data
		};
	};
};

module.exports = Api;