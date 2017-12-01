'use strict';

const express = require('express');
const router  = express.Router();
const m       = require('model/index');

//list
router.get('', (req, res) => {
	console.log('list');
	res.end();
});

router.get('/create', async (req, res) => {
	const body = req.body || req.query;

	try {
		const newBook = await m.Book.byObject(body).save();
		res.status(200).json(null, newBook);
	} catch (err) {
		console.error(err);
		res.status(400).json(err);
	}
});

//byId
router.get('/:id', (req, res) => {
	console.log('byId', req.params);
	res.end();
});


module.exports = router;