'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    // No explicit associations needed here as it's a 'through' table
    // defined in Product and Category models.
  }
  ProductCategory.init({
    id: { // Primary key for the junction table itself
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productId: {
      type: DataTypes.UUID, // Matches Product.id type
      allowNull: false,
      references: {
        model: 'Products', // Name of the target table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', // If a product or category is deleted, the association is removed
    },
    categoryId: {
      type: DataTypes.INTEGER, // Matches Category.id type
      allowNull: false,
      references: {
        model: 'Categories', // Name of the target table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    // Timestamps can be useful for junction tables too
  }, {
    sequelize,
    modelName: 'ProductCategory',
    tableName: 'ProductCategories',
    timestamps: true,
  });
  return ProductCategory;
};
