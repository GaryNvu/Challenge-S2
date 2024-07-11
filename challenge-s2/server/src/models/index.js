const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./User')(sequelize, Sequelize.DataTypes);

const db = {
  User,
  sequelize,
  Sequelize,
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
