'use strict';

const express = require('express');
const router = express.Router();

//list
router.get('', (req, res) => {
	console.log('list');
	res.end();
});

//byId
router.get('/:id', (req, res) => {
	console.log('byId', req.params);
	res.end();
});

module.exports = router;