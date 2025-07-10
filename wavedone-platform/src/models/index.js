'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// Adjust the path to database.js (formerly config.json)
const configPath = path.join(__dirname, '..', '..', 'config', 'database.js'); // Updated path
const config = require(configPath)[env]; // This now loads the JS module
const db = {};

let sequelize;
if (config.use_env_variable && process.env[config.use_env_variable]) {
  // If DATABASE_URL is provided (common in production on many platforms)
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Standard connection using individual parameters
  if (!config.database || !config.username) {
    throw new Error(`Database configuration for environment '${env}' is incomplete. Check username, password, database name.`);
  }
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
