"use strict";

var mongoose = require('mongoose');
var mongoConnection = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('MongoDB connected...');
})["catch"](function (err) {
  return console.log('MongoDB connection error:', err);
});
module.exports = mongoConnection;