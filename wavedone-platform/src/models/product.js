'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, {
        foreignKey: 'creatorId',
        as: 'creator', // Alias for the association
        allowNull: false, // A product must have a creator
      });
      Product.belongsToMany(models.Category, {
        through: 'ProductCategories',
        foreignKey: 'productId',
        otherKey: 'categoryId',
        as: 'categories'
      });
      // Future associations:
      // Product.hasMany(models.OrderItem, { foreignKey: 'productId' });
      // Product.hasMany(models.Review, { foreignKey: 'productId' });
    }
  }
  Product.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT, // For longer product descriptions
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2), // Suitable for currency
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0, // Price cannot be negative
      }
    },
    productType: {
      type: DataTypes.ENUM('digital_download', 'subscription', 'service'),
      allowNull: false,
    },
    creatorId: {
      type: DataTypes.UUID, // Foreign Key from Users table
      allowNull: false,
      references: {
        model: 'Users', // Name of the Users table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // Or 'CASCADE' if products should be deleted with creator
                           // 'SET NULL' might require creatorId to be nullable if that's desired.
                           // For now, assuming creatorId is NOT NULL and a product without a creator is invalid.
                           // If creator is deleted, products might need to be transfered or archived.
                           // Let's make it RESTRICT for now to prevent creator deletion if they have products.
                           // onDelete: 'RESTRICT', // This is safer initially.
                           // Let's stick to the plan's FK definition for now and handle deletion logic in services.
                           // If onDelete: 'SET NULL', then creatorId must be allowNull: true.
                           // Given allowNull: false for creatorId, CASCADE or RESTRICT are more appropriate.
                           // Let's use CASCADE for simplicity in this phase.
      onDelete: 'CASCADE',
    },
    status: {
      type: DataTypes.ENUM('draft', 'published', 'archived'),
      allowNull: false,
      defaultValue: 'draft',
    },
    // Future fields: stockQuantity (for physical or limited digital), coverImageUrl, previewUrl, etc.
    // Timestamps are managed by Sequelize by default
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
    timestamps: true,
  });
  return Product;
};
