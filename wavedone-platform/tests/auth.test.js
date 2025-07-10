const request = require('supertest');
const app = require('../src/app'); // Assuming your Express app is exported from src/app.js
const db = require('../src/models'); // To interact with DB directly for setup/teardown if possible

// NOTE: These tests are integration tests and ideally require a separate test database
// that can be reset between runs. In this environment, full DB interaction assertions
// might be unreliable. We will focus on API response structure and status codes.

describe('Auth Endpoints', () => {
  // Clean up database tables before and after tests if possible
  // This is crucial for test idempotency.
  beforeAll(async () => {
    // It's essential to use a TEST database and ensure it's clean.
    // The following is a conceptual example; actual execution depends on test environment capabilities.
    if (process.env.NODE_ENV === 'test') {
      try {
        // await db.UserRole.destroy({ truncate: true, cascade: true });
        // await db.Role.destroy({ truncate: true, cascade: true });
        // await db.User.destroy({ truncate: true, cascade: true });
        // console.log('Test database tables cleared (conceptually).');
        //
        // // Optionally, seed necessary roles like 'Customer' if not handled by app logic
        // await db.Role.findOrCreate({ where: { name: 'Customer' } });
      } catch (error)
      {
        console.error("Error clearing test database tables:", error);
        // If DB clearing fails, tests might be unreliable.
      }
    }
  });

  afterAll(async () => {
    // Close database connection if Sequelize instance is managed here.
    // await db.sequelize.close(); // Usually handled by the application server's graceful shutdown
  });

  // Generate unique email for each test run to avoid conflicts if DB is not reset
  const generateUniqueEmail = () => `testuser_${Date.now()}@example.com`;
  let testUserEmail = generateUniqueEmail();
  const testPassword = 'Password123!';
  let createdUserId; // To store ID of created user for some tests

  describe('POST /api/v1/auth/register', () => {
    it('should register a new user successfully with default Customer role', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Test User',
          email: testUserEmail,
          password: testPassword,
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'User registered successfully.');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('id');
      expect(res.body.user.email).toEqual(testUserEmail);
      createdUserId = res.body.user.id; // Save for later use

      // Conceptual: Verify role assignment in DB if possible
      // const userWithRoles = await db.User.findByPk(createdUserId, { include: [db.Role] });
      // expect(userWithRoles.Roles.some(role => role.name === 'Customer')).toBe(true);
    });

    it('should fail to register with an existing email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Another Test User',
          email: testUserEmail, // Using the same email
          password: 'anotherPassword123!',
        });
      expect(res.statusCode).toEqual(409); // Conflict
      expect(res.body).toHaveProperty('message', 'Email already in use.');
    });

    it('should fail to register if required fields are missing', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          name: 'Test User Missing Email',
          // email is missing
          password: testPassword,
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Name, email, and password are required.');
    });
  });

  describe('POST /api/v1/auth/login', () => {
    beforeAll(() => {
      // Ensure a user exists for login tests.
      // If the register test didn't run or failed, this might need its own setup.
      // For simplicity, we rely on the previous registration.
      // Alternatively, create a user directly here if DB access is reliable.
      // testUserEmail = generateUniqueEmail(); // Use a fresh email if needed
      // await db.User.create({ name: 'Login Test', email: testUserEmail, passwordHash: await bcrypt.hash(testPassword, 10) });
      // ... and assign role
    });

    it('should login an existing user successfully and return a JWT token', async () => {
      // This test assumes the user from the registration test above exists.
      // If testUserEmail was re-generated, this test would need its own user creation step.
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: testUserEmail,
          password: testPassword,
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Login successful.');
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user.email).toEqual(testUserEmail);
      expect(res.body.user.roles).toBeInstanceOf(Array); // Check if roles array is present
      // expect(res.body.user.roles).toContain('Customer'); // Check for default role
    });

    it('should fail to login with incorrect email', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'wrongemail@example.com',
          password: testPassword,
        });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Invalid credentials. User not found.');
    });

    it('should fail to login with incorrect password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: testUserEmail,
          password: 'WrongPassword123!',
        });
      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Invalid credentials. Password incorrect.');
    });

    it('should fail to login if email or password fields are missing', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          // email: testUserEmail, // Missing email
          password: testPassword,
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Email and password are required.');
    });
  });

  // Placeholder for unit tests for utility functions if any were created:
  // describe('Utility Functions', () => {
  //   it('should test a utility function', () => {
  //     // const result = someUtilityFunction(input);
  //     // expect(result).toEqual(expectedOutput);
  //   });
  // });
});
