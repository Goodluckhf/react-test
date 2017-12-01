'use strict';
const fs = require('fs');
const _  = require('lodash');

//Собираем конфиг

const confDir = './conf';
const defaultPath = `${confDir}/default/`;

const defaultConfig = fs
	.readdirSync(defaultPath)
	.map(fileName => {
		return fileName.replace(/(.*)\.js/, (a, b) => {
			return b;
		});
	}).reduce((conf, fileName) => {
		const moduleName = `./default/${fileName}`;
		conf[fileName] = require(moduleName);
		return conf;
	}, {});

const envConfig = require('./config');

const config = _.merge(defaultConfig, envConfig);

module.exports = config;