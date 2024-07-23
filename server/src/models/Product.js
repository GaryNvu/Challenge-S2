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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      condition : {
        type: DataTypes.STRING,
        allowNull: false,
      },
      language : {
        type: DataTypes.STRING,
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

    Product.associate = models => {
      Product.belongsTo(models.Category, { foreignKey: 'category_id' });
      Product.belongsTo(models.Brand, { foreignKey: 'brand_id' });
    };

    Product.afterCreate(async (product) => {
      await denormalizeProduct(product.id, Product);
    });
    
    Product.afterUpdate(async (product) => {
      await denormalizeProduct(product.id, Product);
    });
  
    return Product;
  };