const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import routes
const authRoutes = require('./routes/authRoutes');
const testRoutes = require('./routes/testRoutes'); // For testing auth and roles
const productRoutes = require('./routes/productRoutes');

// Import error handling middleware
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Basic Route for testing
app.get('/api/v1/', (req, res) => {
  res.json({ message: 'Welcome to Wavedone Digital Solutions Platform API! V1' });
});

// Setup Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/test', testRoutes); // For testing auth and roles
app.use('/api/v1/products', productRoutes);

// Global Error Handler - Must be last middleware
app.use(errorHandler);

// Swagger API Documentation Setup
if (process.env.NODE_ENV !== 'production') { // Usually only for dev/staging
  const swaggerJsdoc = require('swagger-jsdoc');
  const swaggerUi = require('swagger-ui-express');

  const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Wavedone Digital Platform API',
        version: '1.0.0',
        description: 'API documentation for the Wavedone Digital Platform, facilitating digital tools, creative products, micro-learning, and service subscriptions.',
        contact: {
          name: 'Wavedone Digital Solutions Ltd',
          url: 'https://wavedone.com', // Placeholder
          email: 'support@wavedone.com' // Placeholder
        },
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 3000}/api/v1`,
          description: 'Development server'
        },
        // Add more servers (staging, production) as needed
      ],
      components: { // Reusable components like security schemes, schemas
        securitySchemes: {
          bearerAuth: { // Name of the security scheme
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT', // Optional, for documentation
          },
        },
        schemas: { // Example schema (will be expanded with actual models)
          ErrorResponse: {
            type: 'object',
            properties: {
              status: { type: 'string', example: 'error' },
              message: { type: 'string', example: 'An error occurred.' },
              errors: { type: 'array', items: { type: 'object' }, nullable: true },
              stack: { type: 'string', nullable: true, description: 'Stack trace (non-production only)'}
            }
          },
          User: { // Placeholder for User schema
             type: 'object',
             properties: {
                id: { type: 'string', format: 'uuid' },
                name: { type: 'string' },
                email: { type: 'string', format: 'email' },
                // passwordHash should not be here
                createdAt: { type: 'string', format: 'date-time'},
                updatedAt: { type: 'string', format: 'date-time'},
             }
          }
          // Define more schemas for Product, Category, etc.
        }
      },
      security: [ // Global security requirement (can be overridden at operation level)
        {
          bearerAuth: [], // Requires bearerAuth for all operations unless specified otherwise
        },
      ],
    },
    // Path to the API docs files (JSDoc comments)
    apis: ['./src/routes/*.js', './src/controllers/*.js'], // Adjust as needed
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
    // customCss: '.swagger-ui .topbar { display: none }' // Optional: hide topbar
  }));

  // You can also serve the swagger.json file itself
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  const logger = require('./config/logger');
  logger.info(`Swagger UI available at http://localhost:${process.env.PORT || 3000}/api-docs`);
}


module.exports = app;
