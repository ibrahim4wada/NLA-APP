'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt'); // For password hashing

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Role, {
        through: 'UserRoles', // Name of the junction table
        foreignKey: 'userId',
        otherKey: 'roleId',
      });
      // Future associations:
      // User.hasMany(models.Product, { foreignKey: 'creatorId', as: 'products' });
      // User.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });
    }

    // Instance method to check password
    async validPassword(password) {
      return bcrypt.compare(password, this.passwordHash);
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID, // Using UUID for user IDs
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 'role' was in the initial plan, but it's better handled by UserRoles association.
    // We can add a virtual field later if needed for convenience, or specific role-related flags.
    // For example: isVerified, lastLogin, etc.
    // Timestamps are managed by Sequelize by default (createdAt, updatedAt)
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users', // Explicitly define table name
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.passwordHash) { // Assuming passwordHash is set directly before creation
          // In a real scenario, you'd set user.password and hash it here.
          // For now, this hook assumes passwordHash is already computed.
          // If we were to take a plain password:
          // const salt = await bcrypt.genSalt(10);
          // user.passwordHash = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('passwordHash') && user.passwordHash) { // See comment above
          // const salt = await bcrypt.genSalt(10);
          // user.passwordHash = await bcrypt.hash(user.password, salt);
        }
      },
    },
  });
  return User;
};
