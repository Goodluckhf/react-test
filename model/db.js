const mongoose = require('mongoose');
const Promise  = require('bluebird');
const _        = require('lodash');
const config   = require('conf/index');

mongoose.Promise = Promise;
mongoose.set("debug", true)
class Connection {

	constructor(config) {
		this.config = config;
	}

	connect() {
		if (this.connection) {
			return;
		}

		const onError = err => {
			console.error('\x1b[31mm%s\x1b[0m', `connection to db failed: ${err.toString()}`);
		};

		mongoose.connect(this.config.url, {
			reconnectInterval : this.config.reconnectInterval,
			reconnectTries    : this.config.reconnectTries,
			useMongoClient    : this.config.useMongoClient,
			autoIndex         : this.config.autoIndex,
		}).then(() => {
			this.connection = mongoose.connection;

			this.connection.on('error', onError);
			//подсвечиваем зеленым
			console.log('\x1b[32m%s\x1b[0m', `app has connected to db: ${this.config.url}`);
		}, onError);

		process.on('finishProcess', () => {
			this.connection.disconnect().then(() => {
				console.log(colors.green(`connection to db successfully closed: ${this.config.url}`));
			});
		});
	}

};

const connection = new Connection(_.clone(config.db));

connection.connect();