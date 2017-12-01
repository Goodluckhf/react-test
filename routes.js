const express = require('express');
const router  = express.Router();
const api     = require('./routes/api');
const conf    = require('./conf/index.js');


router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

module.exports = app => {
	app.use('/', router);
	app.use('/api', api);
};
