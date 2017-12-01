const express = require('express');
const router  = express.Router();
const api     = require('./routes/api');

router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

module.exports = app => {
	app.use('/', router);
	app.use('/api', api);
};
