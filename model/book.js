'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = Schema({
	_id: Schema.Types.ObjectId,
	title: String,
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
		newBook.title = body.title;
	}
	console.log(newBook);

	return newBook;
};

module.exports  = schema;
