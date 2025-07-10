'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserRoles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.UUID, // Must match Users.id type
        allowNull: false,
        references: {
          model: 'Users', // Name of the target table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      roleId: {
        type: Sequelize.INTEGER, // Must match Roles.id type
        allowNull: false,
        references: {
          model: 'Roles', // Name of the target table
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

    // Optional: Add a composite unique key to prevent duplicate user-role entries if needed
    // await queryInterface.addConstraint('UserRoles', {
    //   fields: ['userId', 'roleId'],
    //   type: 'unique',
    //   name: 'unique_user_role_combination'
    // });
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint('UserRoles', 'unique_user_role_combination');
    await queryInterface.dropTable('UserRoles');
  }
};
