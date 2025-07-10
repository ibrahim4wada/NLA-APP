'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ProductCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Products', // Name of the Products table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories', // Name of the Categories table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Optional: Add a composite unique key if a product shouldn't be in the same category multiple times
    // await queryInterface.addConstraint('ProductCategories', {
    //   fields: ['productId', 'categoryId'],
    //   type: 'unique',
    //   name: 'unique_product_category_combination'
    // });
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint('ProductCategories', 'unique_product_category_combination');
    await queryInterface.dropTable('ProductCategories');
  }
};
