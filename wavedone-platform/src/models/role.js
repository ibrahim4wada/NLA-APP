'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsToMany(models.User, {
        through: 'UserRoles', // Name of the junction table
        foreignKey: 'roleId',
        otherKey: 'userId',
      });
    }
  }
  Role.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Timestamps are managed by Sequelize by default (createdAt, updatedAt)
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'Roles', // Explicitly define table name
    timestamps: true, // Enable timestamps
  });
  return Role;
};
