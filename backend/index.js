const path = require('path');

process.on('uncaughtException', (error) => {
	console.error('Backend uncaught exception:', error);
	process.exitCode = 1;
});

process.on('unhandledRejection', (error) => {
	console.error('Backend unhandled rejection:', error);
	process.exitCode = 1;
});

try {
	require(path.join(__dirname, 'src', 'index.js'));
} catch (error) {
	console.error('Backend startup failed:', error);
	process.exitCode = 1;
}
