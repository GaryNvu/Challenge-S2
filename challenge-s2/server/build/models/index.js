"use strict";

var Sequelize = require('sequelize');
var sequelize = require('../config/db');
var User = require('./User')(sequelize, Sequelize.DataTypes);
var Product = require('./Product')(sequelize, Sequelize.DataTypes);
var Category = require('./Category')(sequelize, Sequelize.DataTypes);
var Brand = require('./Brand')(sequelize, Sequelize.DataTypes);
var Cart = require('./Cart')(sequelize, Sequelize.DataTypes);
var Order = require('./Order')(sequelize, Sequelize.DataTypes);
var OrderItem = require('./OrderItem')(sequelize, Sequelize.DataTypes);
var db = {
  User: User,
  Product: Product,
  Category: Category,
  Brand: Brand,
  Cart: Cart,
  Order: Order,
  OrderItem: OrderItem,
  sequelize: sequelize,
  Sequelize: Sequelize
};
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
module.exports = db;