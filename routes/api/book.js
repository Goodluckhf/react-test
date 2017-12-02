'use strict';

const express      = require('express');
const router       = express.Router();
const api          = require('api');
const BaseApiError = require('api/exceptions/ApiError');

const onError = (err, res) => {
	if (err instanceof BaseApiError) {
		const errObj = err.toObject();

		return res
			.status(errObj.status)
			.json(errObj);
	}

	console.error('err', err.toString());
};

//list
router.get('', async (req, res) => {
	try {
		const bookApi = new api.Book();
		const result = await bookApi.list();
		res.status(200).json(result);
	} catch (err) {
		onError(err, res);
	}
});

router.get('/create', async (req, res) => {
	try {
		const body    = req.query;
		const bookApi = new api.Book();
		const result  = await bookApi.create(body);
	} catch (err) {
		onError(err, res);
	}
});

//byId
router.get('/:id', (req, res) => {
	console.log('byId', req.params);
	res.end();
});


module.exports = router;