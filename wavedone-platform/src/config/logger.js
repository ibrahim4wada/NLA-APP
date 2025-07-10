const winston = require('winston');

// Define log levels and colors (optional, but nice for console)
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3, // For HTTP request logging
  verbose: 4,
  debug: 5,
  silly: 6
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue'
};

winston.addColors(logColors);

// Determine log level based on environment (default to 'info')
const level = process.env.LOG_LEVEL || (process.env.NODE_ENV === 'development' ? 'debug' : 'info');

// Define transports (console, file, etc.)
const transports = [
  // Console transport - always active, format depends on environment
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.colorize({ all: true }), // Apply colors
      winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}` + (info.stack ? `\n${info.stack}` : '')
      )
    ),
    handleExceptions: true, // Log unhandled exceptions
    handleRejections: true,  // Log unhandled promise rejections
  }),
];

// In a real production environment, you would add file transports:
// if (process.env.NODE_ENV === 'production') {
//   transports.push(
//     new winston.transports.File({
//       filename: 'logs/error.log',
//       level: 'error',
//       format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
//       maxsize: 5242880, // 5MB
//       maxFiles: 5,
//     })
//   );
//   transports.push(
//     new winston.transports.File({
//       filename: 'logs/combined.log',
//       level: 'info', // Or your desired combined level
//       format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
//       maxsize: 5242880, // 5MB
//       maxFiles: 5,
//     })
//   );
// }

// Create the logger instance
const logger = winston.createLogger({
  level: level,
  levels: logLevels,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }), // Log stack traces for errors
    winston.format.splat(), // Interpolate %s, %d, %j
    winston.format.json() // Default format (can be overridden by transport)
  ),
  transports: transports,
  exitOnError: false, // Do not exit on handled exceptions
});

// Stream for Morgan (HTTP request logger) - if you decide to use Morgan
// logger.stream = {
//   write: (message) => {
//     logger.http(message.trim());
//   },
// };

module.exports = logger;
