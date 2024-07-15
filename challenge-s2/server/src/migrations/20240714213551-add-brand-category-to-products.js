'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Product', 'brand_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Brand',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('Product', 'category_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Category',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Product', 'brand_id');
    await queryInterface.removeColumn('Product', 'category_id');
  }
};