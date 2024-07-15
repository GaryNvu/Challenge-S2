const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./User')(sequelize, Sequelize.DataTypes);
const Product = require('./Product')(sequelize, Sequelize.DataTypes);
const Category = require('./Category')(sequelize, Sequelize.DataTypes);
const Brand = require('./Brand')(sequelize, Sequelize.DataTypes);

const db = {
  User,
  Product,
  Category,
  Brand,
  sequelize,
  Sequelize,
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
