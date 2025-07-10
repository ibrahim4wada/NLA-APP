'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.Product, {
        through: 'ProductCategories',
        foreignKey: 'categoryId',
        otherKey: 'productId',
        as: 'products'
      });
    }
  }
  Category.init({
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
    slug: { // For URL-friendly identifiers
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // Timestamps are managed by Sequelize by default
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'Categories',
    timestamps: true,
    hooks: {
      beforeValidate: (category, options) => {
        if (category.name && !category.slug) {
          category.slug = category.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        }
      }
    }
  });
  return Category;
};
