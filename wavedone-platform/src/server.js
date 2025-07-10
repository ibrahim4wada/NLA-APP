const http = require('http');
const app = require('./app');
const logger = require('./config/logger'); // Import logger

// Get port from environment variables and provide a default
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
  logger.info(`Access it at http://localhost:${PORT}`);
  logger.info(`Current environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`Default log level: ${logger.level}`);
});

// Basic graceful shutdown (can be expanded)
const signals = {
  'SIGINT': 2,  // Ctrl+C
  'SIGTERM': 15 // Default kill signal
};

function shutdown(signal, value) {
  logger.info(`Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    logger.info('HTTP server closed.');
    // Here you would also close database connections, etc.
    // db.sequelize.close().then(() => logger.info('Database connection closed.'));
    process.exit(128 + value); // Exit with conventional signal code
  });
}

Object.keys(signals).forEach((signal) => {
  process.on(signal, () => {
    shutdown(signal, signals[signal]);
  });
});

// Handle unhandled promise rejections (logged by Winston's handleRejections)
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', { promise, reason });
  // Optionally, exit or perform other cleanup, but Winston already logs it.
  // Application specific cleanup or graceful shutdown might be needed here.
});

// Handle uncaught exceptions (logged by Winston's handleExceptions)
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', { error });
  // Winston's transport will log this. It's often recommended to exit after an uncaught exception,
  // as the application might be in an unstable state.
  // shutdown('uncaughtException', 1); // Trigger graceful shutdown if possible
});
