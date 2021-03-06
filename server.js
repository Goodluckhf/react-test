/**
 * Module dependencies.
 */
let app;

try {
	app = require('./app');
} catch (error) {
	console.error(`Link error`, {error});
	
	process.on('uncaughtException', () => true);
	if (process.env.NODE_ENV === 'development') {
		/*
		 * для режима development не используем остановку программы(process.exit),
		 * так как supervisor будет ее перезапускать бесконечно в случае фатальной ошибки.
		 * Чтоб node не выполнял файл ниже генерируем ошибку 
		 * и чтоб он не закрылся от бездействие создаем бесконечное ожидание
		 */
		setInterval(() => true, 999999999);
		throw error;
	} else {
		/*
		 * В режиме отличном от development даем 10 сек и потом убиваем процесс		
		 */
		setTimeout(() => process.exit(3), 1000 * 10);
		throw error;
	}
}

const debug  = require('debug')('react-backend:server');
const http   = require('http');
const config = require('conf/index');
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(config.app.port || process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

// Кастомное событие сигнализирующие, что необходимо остановить сервер 
process.on('finishProcess', (reason, exitTimeout) => {
	logDebug(`The process is ending. Reason "${reason}". ${httpServer[SOCKETS].size} connections need to be closed.`);
	
	if (process.env.NODE_ENV === 'development') {
		return process.exit(1);
		//throw 'Roger that. I kill myself, sir!'; // EXPERIMENTAL
	}
	
		
	setTimeout(() => {
		console.log(`Soft shutdown timeout. Immediate exit !!!`);
		process.exit(1);
	}, exitTimeout || EXIT_TIMEOUT).unref();
	
	const exitCode = (reason instanceof Error) ? 1 : 0;
	
	httpServer[IS_CLOSE_NEEDED] = true;
	
	httpServer.getConnections((error) => {
		if (error) {
			console.error(`Get connections error : ${error}`);
			process.exit(1);
		}
		
		httpServer.close((error) => {
			if (error) {
				console.error(`Http server: Close error: ${error}`);
			}
			
			// Даем возможность сбросить в файл логи буньяну и т.п.
			setTimeout(() => process.exit(exitCode), 500);
		});
	});
});


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	debug('Listening on ' + bind);
}
