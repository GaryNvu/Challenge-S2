"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var express = require('express');
var bodyParser = require('body-parser');
var sequelize = require('../src/config/db');
var mongoConnection = require('../src/mongo/db');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var userRoutes = require('../src/routes/user');
var productsRoutes = require('../src/routes/product');
var securityRoutes = require('../src/routes/security');
var cartRoutes = require('../src/routes/cart');
var categoryRoutes = require('../src/routes/category');
var brandRoutes = require('../src/routes/brand');
var orderRoutes = require('../src/routes/order');
var app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', userRoutes);
app.use('/api', productsRoutes);
app.use('/api', securityRoutes);
app.use('/api', cartRoutes);
app.use('/api', categoryRoutes);
app.use('/api', brandRoutes);
app.use('/api', orderRoutes);
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Server Error');
});
var startServer = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var PORT;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return sequelize.authenticate();
        case 3:
          console.log('Connection to the database has been established successfully.');
          _context.next = 6;
          return sequelize.sync();
        case 6:
          _context.next = 8;
          return mongoConnection;
        case 8:
          PORT = process.env.PORT || 3000;
          app.listen(PORT, function () {
            console.log("Server running on port ".concat(PORT));
          });
          _context.next = 15;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          console.error('Unable to connect to the database:', _context.t0);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 12]]);
  }));
  return function startServer() {
    return _ref.apply(this, arguments);
  };
}();
startServer();