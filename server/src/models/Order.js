const { randomBytes } = require('crypto');

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: () => randomBytes(8).toString('hex')
        },
        userId: { 
            type: DataTypes.INTEGER, 
            allowNull: false,
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
            defaultValue: 'attente' 
        },
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
  
    Order.associate = models => {
        Order.belongsTo(models.User, { foreignKey: 'userId' });
        Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
      };
    
    return Order;
};