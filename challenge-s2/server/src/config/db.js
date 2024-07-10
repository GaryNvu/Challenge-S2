const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cardory', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;