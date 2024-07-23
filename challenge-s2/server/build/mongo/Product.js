"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
  sqlID: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});
var MongoProduct = mongoose.model('Product', ProductSchema);
module.exports = MongoProduct;