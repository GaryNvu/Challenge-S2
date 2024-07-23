const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_DB_OVH, process.env.POSTGRES_USER_OVH, process.env.POSTGRES_PASSWORD_OVH, {
  host: process.env.POSTGRES_HOST_OVH,
  port: process.env.POSTGRES_PORT_OVH,
  dialect: 'postgres',
  logging: false,
});

const User = require('../models/User')(sequelize, Sequelize.DataTypes);

module.exports = sequelize;