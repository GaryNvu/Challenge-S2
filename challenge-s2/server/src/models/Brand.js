module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brand', {
      name: DataTypes.STRING,
    });
    Brand.associate = models => {
      Brand.hasMany(models.Product, { foreignKey: 'brand_id' });
    };
    return Brand;
  };