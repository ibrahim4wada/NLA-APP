'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    // No need for explicit associations here as it's a through table
    // defined in User and Role models.
    // static associate(models) { }
  }
  UserRole.init({
    id: { // It's good practice for junction tables to have their own PK
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID, // Matches User model's ID type
      allowNull: false,
      references: {
        model: 'Users', // Name of the target table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    roleId: {
      type: DataTypes.INTEGER, // Matches Role model's ID type
      allowNull: false,
      references: {
        model: 'Roles', // Name of the target table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    // Timestamps can be useful even for junction tables
  }, {
    sequelize,
    modelName: 'UserRole', // Standard singular model name
    tableName: 'UserRoles', // Explicitly define table name
    timestamps: true,
  });
  return UserRole;
};
