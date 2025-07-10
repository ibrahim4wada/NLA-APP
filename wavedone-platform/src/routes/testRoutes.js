const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middlewares/authMiddleware');

// @route   GET api/v1/test/all
// @desc    Publicly accessible test route
// @access  Public
router.get('/all', (req, res) => {
  res.json({ message: 'This is a public test route, accessible by anyone.' });
});

// @route   GET api/v1/test/protected
// @desc    Protected test route for any authenticated user
// @access  Private (Authenticated)
router.get('/protected', protect, (req, res) => {
  res.json({
    message: 'This is a protected test route, accessible by any authenticated user.',
    user: req.user // req.user is populated by the 'protect' middleware
  });
});

// @route   GET api/v1/test/customer
// @desc    Protected test route for users with "Customer" role
// @access  Private (Customer)
router.get('/customer', protect, authorizeRoles('Customer'), (req, res) => {
  res.json({
    message: 'This is a protected test route, accessible by users with the "Customer" role.',
    user: req.user
  });
});

// @route   GET api/v1/test/admin
// @desc    Protected test route for users with "Admin" role
// @access  Private (Admin)
router.get('/admin', protect, authorizeRoles('Admin'), (req, res) => {
  res.json({
    message: 'This is a protected test route, accessible by users with the "Admin" role.',
    user: req.user
  });
});

// @route   GET api/v1/test/multi-role
// @desc    Protected test route for users with "Admin" OR "Vendor" role
// @access  Private (Admin, Vendor)
router.get('/multi-role', protect, authorizeRoles('Admin', 'Vendor'), (req, res) => {
  res.json({
    message: 'This is a protected test route, accessible by users with "Admin" OR "Vendor" roles.',
    user: req.user
  });
});

module.exports = router;
