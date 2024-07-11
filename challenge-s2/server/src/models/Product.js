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
      categorie: {
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
    });
  
    return Product;
  };