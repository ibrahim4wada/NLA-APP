const http = require('http');
const app = require('./app');

// TODO: Get port from environment variables and provide a default
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Access it at http://localhost:${PORT}`);
});

// TODO: Graceful shutdown
// process.on('SIGTERM', () => {
//   console.log('SIGTERM signal received: closing HTTP server');
//   server.close(() => {
//     console.log('HTTP server closed');
//     // TODO: Close database connection
//     process.exit(0);
//   });
// });
