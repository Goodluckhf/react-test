'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = Schema({
	title: {
		type:String,
		required: true
	},
	year: {
		type: Number,
		required: true
	},
	updateAt: {
		type: Date,
		default: Date.now
	},
	createAt: {
		type: Date,
		default: Date.now
	}
});

schema.statics.byObject = function (object) {
	const newBook = new this();
	if (object.title) {
		newBook.title = object.title;
	}

	return newBook;
};

module.exports  = schema;
