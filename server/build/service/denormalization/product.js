"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _require = require('mongoose'),
  ObjectId = _require.Types.ObjectId;
var MongoProduct = require("../../mongo/Product");
var denormalizeProduct = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(productId, Product) {
    var product, mongoProductId;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Product.findByPk(productId, {
            include: ['Category', 'Brand']
          });
        case 3:
          product = _context.sent;
          if (!product) {
            _context.next = 8;
            break;
          }
          mongoProductId = new ObjectId(productId);
          _context.next = 8;
          return MongoProduct.findOneAndUpdate({
            _id: mongoProductId
          }, {
            sqlID: productId,
            name: product.name,
            price: product.price,
            brand: product.Brand.name,
            category: product.Category.name,
            description: product.description,
            weight: product.weight,
            condition: product.condition,
            language: product.language,
            stock: product.stock,
            image: product.image
          }, {
            upsert: true
          });
        case 8:
          _context.next = 13;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error("Error denormalizing product: ".concat(_context.t0.message));
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function denormalizeProduct(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
module.exports = denormalizeProduct;