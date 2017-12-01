require('./db');
const mongoose = require('mongoose');

module.exports = {
	Book: mongoose.model('Book', require('./book')),
};