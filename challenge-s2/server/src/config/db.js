const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cardory', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
  logging: false,
});

const User = require('../models/User')(sequelize, Sequelize.DataTypes);

module.exports = sequelize;