'use strict';

const express       = require('express');
const router        = express.Router();
const apiController = require('./api/index');

router.use('/books', apiController.book);


module.exports = router;