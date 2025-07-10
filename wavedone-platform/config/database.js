// Load environment variables from .env file if using dotenv (optional, usually done at app start)
// require('dotenv').config(); // Or ensure .env is loaded before this config is required

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'db_user',
    password: process.env.DB_PASSWORD || 'db_password',
    database: process.env.DB_NAME || 'wavedone_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_TEST_USERNAME || 'db_user_test',
    password: process.env.DB_TEST_PASSWORD || 'db_password_test',
    database: process.env.DB_TEST_NAME || 'wavedone_test',
    host: process.env.DB_TEST_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_TEST_PORT, 10) || 5433,
    dialect: 'postgres',
    logging: false, // Disable Sequelize logging for tests unless needed for debugging
  },
  production: {
    username: process.env.DB_PROD_USERNAME,
    password: process.env.DB_PROD_PASSWORD,
    database: process.env.DB_PROD_NAME,
    host: process.env.DB_PROD_HOST,
    port: parseInt(process.env.DB_PROD_PORT, 10) || 5432,
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL', // For services like Heroku/Render
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Adjust as per your DB provider's SSL requirements
      }
    },
    logging: false, // Typically disable or reduce logging in production
  }
};
