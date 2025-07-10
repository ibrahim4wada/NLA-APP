const { Sequelize } = require('../models'); // To check for Sequelize error types
const logger = require('../config/logger'); // Import the configured logger

// Basic error handler middleware
const errorHandler = (err, req, res, next) => {
  // Log the error with more details using Winston
  logger.error(`${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`, {
    error: {
      message: err.message,
      stack: err.stack,
      name: err.name,
      ...(err.errors && { validationErrors: err.errors }), // Include Sequelize validation errors
      ...(err.fields && { constraintFields: err.fields }), // Include Sequelize unique constraint fields
    }
  });

  let statusCode = err.statusCode || 500; // Default to 500 Internal Server Error
  let message = err.message || 'An unexpected error occurred.';
  let errors = err.errors || null; // For validation errors or multiple errors

  // Handle Sequelize Validation Errors
  if (err instanceof Sequelize.ValidationError) {
    statusCode = 400; // Bad Request
    message = 'Validation failed.';
    errors = err.errors.map(e => ({ field: e.path, message: e.message, value: e.value }));
  }

  // Handle Sequelize Unique Constraint Errors
  if (err instanceof Sequelize.UniqueConstraintError) {
    statusCode = 409; // Conflict
    message = 'Duplicate entry.'; // More specific message could be constructed from err.fields
    errors = err.errors.map(e => ({ field: e.path, message: e.message, value: e.value }));
    // Example: `Duplicate value for ${Object.keys(err.fields).join(', ')}`
    if (err.fields) {
        const fieldKeys = Object.keys(err.fields);
        if (fieldKeys.length > 0) {
            message = `The value for '${fieldKeys.join(', ')}' is already in use. Please choose a different value.`;
        }
    }
  }

  // Handle Sequelize Database Errors (more generic)
  if (err instanceof Sequelize.DatabaseError) {
    statusCode = 500; // Could be a more specific DB error code if parsed
    message = 'A database error occurred.';
    // Potentially log err.original for more details internally but don't expose to client
  }

  // Handle JWT Errors (e.g., from jsonwebtoken)
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = 401; // Unauthorized
    message = 'Not authorized: ' + err.message; // e.g., "jwt expired", "invalid token"
    errors = null; // Clear any previous errors array
  }

  // Ensure status code is a valid HTTP status code number
  if (typeof statusCode !== 'number' || statusCode < 100 || statusCode > 599) {
    console.warn(`Invalid statusCode detected: ${statusCode}. Resetting to 500.`);
    statusCode = 500;
  }

  // Don't send error details in production for generic 500 errors
  if (process.env.NODE_ENV === 'production' && statusCode === 500 && !err.isOperational) {
    message = 'Internal Server Error.';
    errors = null; // Don't leak error details
  }

  res.status(statusCode).json({
    status: statusCode >= 400 && statusCode < 500 ? 'fail' : 'error', // JSend-like status
    message,
    ...(errors && { errors }), // Conditionally add errors array
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }) // Include stack in non-production
  });
};

module.exports = errorHandler;
