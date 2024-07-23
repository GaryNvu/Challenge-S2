"use strict";

var mongoConnection = require('./db');
var Product = require('./Product')(mongoConnection);
var db = {
  Product: Product,
  mongoConnection: mongoConnection
};
module.exports = db;