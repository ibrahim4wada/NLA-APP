const jwt = require('jsonwebtoken');
const db = require('../models'); // Assuming User model might be needed for role checks from DB if not in JWT

// IMPORTANT: JWT_SECRET should be the same as used in authController.js
// and should come from environment variables.
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_and_long_jwt_secret_key_min_32_chars';

// Middleware to protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Attach user to request object
      // The payload structure depends on what was signed in authController.login
      // Assuming payload was { user: { id, email, name, roles } }
      req.user = decoded.user;

      // Optionally, re-fetch user from DB to ensure they are still valid/active
      // const user = await db.User.findByPk(decoded.user.id);
      // if (!user) {
      //   return res.status(401).json({ message: 'Not authorized, user not found' });
      // }
      // req.user = user; // If fetching from DB

      next();
    } catch (error) {
      console.error('Token verification error:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed or expired.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided.' });
  }
};

// Middleware to authorize based on roles
// Example usage: router.get('/admin-only', protect, authorizeRoles('Admin'), (req, res) => { ... });
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.roles) {
        // This can happen if protect middleware failed to set req.user or user has no roles
        return res.status(401).json({ message: 'Not authorized, user roles not available.' });
    }

    const userRoles = req.user.roles; // Assuming roles is an array of role names in the JWT payload

    const hasPermission = userRoles.some(role => allowedRoles.includes(role));

    if (hasPermission) {
      next();
    } else {
      return res.status(403).json({ message: `Forbidden. User role (${userRoles.join(', ')}) is not authorized to access this route. Allowed roles: ${allowedRoles.join(', ')}` });
    }
  };
};
