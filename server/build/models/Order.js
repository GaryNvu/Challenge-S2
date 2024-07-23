"use strict";

module.exports = function (sequelize, DataTypes) {
  var Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending'
    },
    // Exemples : 'pending', 'shipped', 'delivered', 'cancelled'
    paymentMethod: {
      type: DataTypes.STRING
    },
    shippingFee: {
      type: DataTypes.FLOAT
    },
    discountCode: {
      type: DataTypes.STRING
    },
    taxAmount: {
      type: DataTypes.FLOAT
    },
    deliveryTrackingNumber: {
      type: DataTypes.STRING
    },
    note: {
      type: DataTypes.TEXT
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });
  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    Order.hasMany(models.OrderItem, {
      foreignKey: 'orderItem_id'
    });
  };
  return Order;
};