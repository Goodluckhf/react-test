'use strict';
const fs = require('fs');
const _  = require('lodash');

//Собираем конфиг
const defaultPath = './conf/default/';

const defaultConfig = fs
	.readdirSync(defaultPath)
	.reduce((conf, fileName) => {
		conf[fileName] = require(fileName);
	}, {});

const envConfig = require('./config');

const config = _.merge(defaultConfig, envConfig);

module.exports = config;