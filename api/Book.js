'use strict';

const BaseApi       = require('./Api');
const models        = require('model/');
const NotFoundError = require('./exceptions/ApiNotFoundError');

class BookApi extends BaseApi {

	//Список книг
	async list() {
		const books = await models.Book.find();

		if (! books || books.length === 0) {
			throw new NotFoundError();
		}

		return this.buildAnswer(books);
	};

	//Создать новую книгу
	async create(params) {

		const rules = item => {
			item.required().isObject( obj => {
				obj('title').required().isString();
				obj('year').required().isNumeric();
			});
		};

		this.validate(params, rules);

		const newBook = models.Book.byObject(params);
		await newBook.save();

		return this.buildAnswer(newBook);
	};
};

module.exports = BookApi;