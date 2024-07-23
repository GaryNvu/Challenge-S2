"use strict";

module.exports = function (sequelize, DataTypes) {
  var Brand = sequelize.define('Brand', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  });
  Brand.associate = function (models) {
    Brand.hasMany(models.Product, {
      foreignKey: 'brand_id'
    });
  };
  return Brand;
};