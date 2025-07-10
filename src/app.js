const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// TODO: Import routes
// const authRoutes = require('./routes/authRoutes');
// const productRoutes = require('./routes/productRoutes');

// TODO: Import error handling middleware
// const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Basic Route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Wavedone Digital Solutions Platform API!' });
});

// TODO: Setup Routes
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/products', productRoutes);

// TODO: Global Error Handler
// app.use(errorHandler);

module.exports = app;
