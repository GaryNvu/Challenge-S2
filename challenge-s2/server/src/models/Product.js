const denormalizeProduct = require("../service/denormalization/product");

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });

    Product.afterCreate(async (product) => {
      console.log('Product created, denormalizing...');
      await denormalizeProduct(product.id, Product);
    });
    
    Product.afterUpdate(async (product) => {
      console.log('Product updated, denormalizing...');
      await denormalizeProduct(product.id, Product);
    });
  
    return Product;
  };