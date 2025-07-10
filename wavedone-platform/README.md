# Wavedone Platform - Backend API

This is the backend API for the Wavedone Digital Platform, a comprehensive solution for digital tools, creative products, micro-learning content, and service subscriptions.

## Vision

Africa’s #1 platform for AI-powered digital tools, creative products, micro-learning content, and service subscriptions.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Development Setup](#development-setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

- **Framework**: Node.js with Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens) with bcrypt for password hashing
- **API Documentation**: Swagger (OpenAPI) via `swagger-jsdoc` and `swagger-ui-express`
- **Testing**: Jest with Supertest
- **Logging**: Winston
- **Primary Language**: JavaScript (Node.js)

## Project Structure

```
wavedone-platform/
├── config/               # Configuration files (database, logger, swagger options in app.js)
├── coverage/             # Jest test coverage reports (generated)
├── logs/                 # Log files (if file transport is enabled in logger) - Gitignored
├── migrations/           # Sequelize database migration files
├── node_modules/         # NPM dependencies - Gitignored
├── seeders/              # Sequelize database seed files
├── src/                  # Source code
│   ├── controllers/      # Request handlers, business logic layer
│   ├── middlewares/      # Custom Express middleware (auth, error handling, etc.)
│   ├── models/           # Sequelize models and index.js for DB setup
│   ├── routes/           # API route definitions
│   ├── app.js            # Main Express application setup
│   └── server.js         # HTTP server initialization
├── tests/                # Jest test files (integration, unit)
├── .env                  # Environment variables (template: .env.example) - Gitignored
├── .gitignore            # Specifies intentionally untracked files that Git should ignore
├── jest.config.js        # Jest configuration file
├── package-lock.json     # Records exact versions of dependencies
├── package.json          # Project metadata and dependencies
└── README.md             # This file
```

## Prerequisites

- Node.js (version specified in `.nvmrc` if used, e.g., v18.x, v20.x or LTS)
- npm (usually comes with Node.js)
- PostgreSQL server (running locally or accessible via network)
- Git

## Development Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd wavedone-platform
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the `wavedone-platform` directory. You can copy from `.env.example` (which should be created) and fill in your specific values.
    ```bash
    cp .env.example .env
    # Then edit .env with your configurations
    ```
    See [Environment Variables](#environment-variables) section for required variables.

4.  **Database Setup:**
    - Ensure your PostgreSQL server is running.
    - Create a development database and a test database in PostgreSQL.
    - Update your `.env` file with the correct database credentials and names.
    - Run database migrations:
      ```bash
      # NOTE: sequelize-cli execution was problematic in the dev environment.
      # If sequelize-cli is properly installed and configured globally or accessible via npx:
      # npx sequelize-cli db:migrate
      # Otherwise, migrations might need to be run via a custom script or manually
      # if the issues persist in the target deployment/dev environment.
      echo "Migration command depends on sequelize-cli setup. Placeholder: npm run db:migrate (if script exists)"
      ```
    - (Optional) Run database seeders:
      ```bash
      # npx sequelize-cli db:seed:all
      echo "Seeder command depends on sequelize-cli setup. Placeholder: npm run db:seed (if script exists)"
      ```

## Environment Variables

Create a `.env` file in the project root (`wavedone-platform/.env`) with the following variables.
An `.env.example` file should be provided as a template.

```ini
# Application Configuration
NODE_ENV=development # development, test, production
PORT=3000

# Database (Development - adjust for your setup)
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=wavedone_dev
DB_HOST=localhost
DB_PORT=5432
DB_DIALECT=postgres # Should remain postgres

# Database (Test - adjust for your setup, ensure this DB exists)
DB_TEST_USERNAME=your_db_user_test
DB_TEST_PASSWORD=your_db_password_test
DB_TEST_NAME=wavedone_test
DB_TEST_HOST=localhost
DB_TEST_PORT=5433 # Or same as dev if using different DB names on same instance

# JWT Configuration
JWT_SECRET=your_very_strong_and_long_secret_key_for_jwt_at_least_32_characters
JWT_EXPIRES_IN=1h # e.g., 1h, 7d, 30m

# Logging Configuration
LOG_LEVEL=debug # For development (debug, info, warn, error)
# LOG_LEVEL=info # For production

# Add other environment-specific variables here (e.g., AWS keys, email service keys)
# For production, DATABASE_URL might be used by services like Heroku/Render:
# DATABASE_URL=postgres://user:password@host:port/database_name
```

## Running the Application

-   **Development mode:**
    ```bash
    npm start
    ```
    This will start the server (usually with `nodemon` if configured, but current `start` is `node src/server.js`).
    The API will typically be available at `http://localhost:3000`.

-   **Production mode:**
    Ensure `NODE_ENV=production` is set. The start command might be the same, or a production-specific script could be used (e.g., involving `pm2`).

## Running Tests

```bash
npm test
```
This will execute Jest tests. Coverage reports will be generated in the `coverage/` directory.

## API Documentation

Once the development server is running (and `NODE_ENV` is not `production`), API documentation (Swagger UI) is available at:
[`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)

The OpenAPI specification JSON can be found at:
[`http://localhost:3000/api-docs.json`](http://localhost:3000/api-docs.json)

## Contributing

Please refer to `CONTRIBUTING.md` (to be created) for guidelines on contributions, coding standards, and pull request processes.

## License

This project is licensed under the [ISC License](LICENSE) (or specify chosen license).
A `LICENSE` file should be added.

---

This README provides a starting point and will be updated as the project evolves.
```
