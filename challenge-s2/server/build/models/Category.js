"use strict";

module.exports = function (sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  });
  Category.associate = function (models) {
    Category.hasMany(models.Product, {
      foreignKey: 'category_id'
    });
  };
  return Category;
};