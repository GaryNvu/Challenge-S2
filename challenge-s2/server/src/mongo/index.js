const mongoConnection = require('./db');

const Product = require('./Product')(mongoConnection);

const db = {
  Product,
  mongoConnection,
};

module.exports = db;