module.exports = {
  testEnvironment: 'node',
  verbose: true, // Output individual test results
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/config/', // Usually no need to test config files directly
    '/migrations/',
    '/seeders/',
    '/src/app.js', // Entry points might be better tested via integration tests
    '/src/server.js'
  ],
  testMatch: [ // Pattern for Jest to find test files
    '**/tests/**/*.test.js', // Standard pattern: .test.js files in any tests subfolder
    '**/tests/**/*.spec.js'  // Or .spec.js
  ],
  // setupFilesAfterEnv: ['./tests/setup.js'], // If you need a setup file after env is ready
  // globalTeardown: './tests/teardown.js', // For global teardown logic
  // clearMocks: true, // Automatically clear mock calls and instances between every test
};
