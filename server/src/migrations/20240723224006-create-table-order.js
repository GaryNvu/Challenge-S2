'use strict';
const { randomBytes } = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: () => randomBytes(8).toString('hex')
      },
      userId: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      address: { 
        type: Sequelize.STRING,
        allowNull: false 
      },
      total: { 
        type: Sequelize.FLOAT,
        allowNull: false 
      },
      status: { 
        type: Sequelize.STRING,
        defaultValue: 'attente' 
      },
      paymentMethod: { 
        type: Sequelize.STRING 
      },
      shippingFee: { 
        type: Sequelize.FLOAT 
      },
      discountCode: { 
        type: Sequelize.STRING 
      },
      taxAmount: {
        type: Sequelize.FLOAT 
      },
      deliveryTrackingNumber: { 
        type: Sequelize.STRING 
      },
      note: { 
        type: Sequelize.TEXT 
      },
      createdAt: { 
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW 
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};
