'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'verificationToken', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('Users', 'emailVerified', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'verificationToken');
    await queryInterface.removeColumn('Users', 'emailVerified');
  }
};
