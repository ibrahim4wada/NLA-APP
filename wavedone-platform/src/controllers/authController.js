const db = require('../models'); // Loads src/models/index.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Helper function to find or create a role (e.g., 'Customer')
const findOrCreateRole = async (roleName) => {
  let role = await db.Role.findOne({ where: { name: roleName } });
  if (!role) {
    role = await db.Role.create({ name: roleName });
    console.log(`Role '${roleName}' created.`);
  }
  return role;
};

// User Registration
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    // Check if user already exists
    const existingUser = await db.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use.' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await db.User.create({
      name,
      email,
      passwordHash, // Storing the hashed password
    });

    // Assign default role (e.g., "Customer")
    // This is a simplified approach. In a real app, roles might be pre-seeded
    // or managed more dynamically.
    try {
      const customerRole = await findOrCreateRole('Customer');
      if (customerRole) {
        await newUser.addRole(customerRole); // Sequelize association method
      } else {
        // This case should ideally not happen if findOrCreateRole works
        console.warn('Could not find or create Customer role for new user.');
      }
    } catch (roleError) {
      // Log role assignment error but don't fail registration if user creation was successful
      console.error('Error assigning role to user:', roleError);
      // Potentially queue this for an admin to look at or retry later
    }

    // Prepare user data to return (excluding password)
    const userToReturn = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      // roles: (await newUser.getRoles()).map(r => r.name) // Optionally return roles
    };

    return res.status(201).json({ message: 'User registered successfully.', user: userToReturn });

  } catch (error) {
    console.error('Registration error:', error);
    // Pass error to a global error handler if implemented, otherwise send generic response
    // For now, sending a generic error
    if (!res.headersSent) {
       return res.status(500).json({ message: 'Internal server error during registration.' });
    }
    // If headers already sent, delegate to Express default error handler
    next(error);
  }
};

// User Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user by email
    const user = await db.User.findOne({
      where: { email },
      include: [{ model: db.Role, as: 'Roles', attributes: ['name'], through: { attributes: [] } }] // Include roles
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials. User not found.' });
    }

    // Check password
    const isMatch = await user.validPassword(password); // Using instance method from User model
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials. Password incorrect.' });
    }

    // User authenticated, generate JWT
    // IMPORTANT: JWT_SECRET should be a strong, random string stored in environment variables
    const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_and_long_jwt_secret_key_min_32_chars';
    if (JWT_SECRET === 'your_super_secret_and_long_jwt_secret_key_min_32_chars' && process.env.NODE_ENV !== 'test') {
        console.warn("WARNING: Using default JWT_SECRET. Please set a strong secret in your environment variables for production.");
    }

    const userRoles = user.Roles ? user.Roles.map(role => role.name) : [];

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        roles: userRoles,
      },
    };

    // Token expiration (e.g., 1 hour, 1 day)
    const expiresIn = process.env.JWT_EXPIRES_IN || '1h';

    jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn },
      (err, token) => {
        if (err) throw err; // Should be caught by outer try-catch

        const userToReturn = {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: userRoles,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        };
        res.json({
          message: 'Login successful.',
          token,
          user: userToReturn,
        });
      }
    );

  } catch (error) {
    console.error('Login error:', error);
    if (!res.headersSent) {
        return res.status(500).json({ message: 'Internal server error during login.' });
    }
    next(error);
  }
};
