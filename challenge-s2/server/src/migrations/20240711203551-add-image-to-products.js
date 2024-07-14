'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'image', {
      type: Sequelize.STRING,
      allowNull: true, // or false if you want to make it mandatory
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'image');
  }
};
