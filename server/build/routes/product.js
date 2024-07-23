"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _require = require('express'),
  Router = _require.Router;
var _require2 = require('../models'),
  Product = _require2.Product,
  Category = _require2.Category,
  Brand = _require2.Brand;
var MongoProduct = require('../mongo/Product');
var router = Router();

// GET ALL product
router.get('/product', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$query, category, brand, minPrice, maxPrice, inStock, search, query, products;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$query = req.query, category = _req$query.category, brand = _req$query.brand, minPrice = _req$query.minPrice, maxPrice = _req$query.maxPrice, inStock = _req$query.inStock, search = _req$query.search;
          query = {};
          if (search) {
            query.$or = [{
              name: {
                $regex: search,
                $options: 'i'
              }
            }, {
              description: {
                $regex: search,
                $options: 'i'
              }
            }];
          }
          if (category) {
            query.category = category;
          }
          if (brand) {
            query.brand = brand;
          }
          if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) {
              query.price.$gte = Number(minPrice);
            }
            if (maxPrice) {
              query.price.$lte = Number(maxPrice);
            }
          }
          _context.prev = 6;
          _context.next = 9;
          return MongoProduct.find(query);
        case 9:
          products = _context.sent;
          res.json(products);
          _context.next = 17;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](6);
          console.error(_context.t0.message);
          res.status(500).send('Server Error');
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[6, 13]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// GET product by ID
router.get('/product/:id', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, product;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return MongoProduct.findById(id);
        case 4:
          product = _context2.sent;
          if (product) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Product not found'
          }));
        case 7:
          res.json(product);
          _context2.next = 14;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0.message);
          res.status(500).send('Server Error');
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 10]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// POST product
router.post('/product', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, name, price, brand_id, category_id, description, weight, condition, language, stock, image, brand, category, product;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, price = _req$body.price, brand_id = _req$body.brand_id, category_id = _req$body.category_id, description = _req$body.description, weight = _req$body.weight, condition = _req$body.condition, language = _req$body.language, stock = _req$body.stock, image = _req$body.image;
          _context3.prev = 1;
          _context3.next = 4;
          return Brand.findByPk(brand_id);
        case 4:
          brand = _context3.sent;
          _context3.next = 7;
          return Category.findByPk(category_id);
        case 7:
          category = _context3.sent;
          if (brand) {
            _context3.next = 10;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            msg: 'Brand not found'
          }));
        case 10:
          if (category) {
            _context3.next = 12;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            msg: 'Category not found'
          }));
        case 12:
          _context3.next = 14;
          return Product.create({
            name: name,
            price: price,
            brand_id: brand_id,
            category_id: category_id,
            description: description,
            weight: weight,
            condition: condition,
            language: language,
            stock: stock,
            image: image
          });
        case 14:
          product = _context3.sent;
          res.json(product);
          _context3.next = 22;
          break;
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0.message);
          res.status(500).send('Server Error');
        case 22:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 18]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

// PUT product (update)
router.put('/product/:id', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, _req$body2, name, price, brand_id, category_id, description, weight, stock, image, product, brand, category;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, name = _req$body2.name, price = _req$body2.price, brand_id = _req$body2.brand_id, category_id = _req$body2.category_id, description = _req$body2.description, weight = _req$body2.weight, stock = _req$body2.stock, image = _req$body2.image;
          _context4.prev = 2;
          _context4.next = 5;
          return Product.findByPk(id);
        case 5:
          product = _context4.sent;
          if (product) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            msg: 'Product not found'
          }));
        case 8:
          _context4.next = 10;
          return Brand.findByPk(brand_id);
        case 10:
          brand = _context4.sent;
          _context4.next = 13;
          return Category.findByPk(category_id);
        case 13:
          category = _context4.sent;
          if (brand) {
            _context4.next = 16;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            msg: 'Brand not found'
          }));
        case 16:
          if (category) {
            _context4.next = 18;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            msg: 'Category not found'
          }));
        case 18:
          if (product) {
            _context4.next = 20;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            msg: 'Product not found'
          }));
        case 20:
          _context4.next = 22;
          return product.update({
            name: name,
            price: price,
            brand_id: brand_id,
            category_id: category_id,
            description: description,
            weight: weight,
            stock: stock,
            image: image
          });
        case 22:
          res.json(product);
          _context4.next = 29;
          break;
        case 25:
          _context4.prev = 25;
          _context4.t0 = _context4["catch"](2);
          console.error(_context4.t0.message);
          res.status(500).send('Server Error');
        case 29:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 25]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

// DELETE product
router["delete"]('/product/:id', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, product, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return Product.findByPk(id);
        case 4:
          product = _context5.sent;
          if (product) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            msg: 'Product not found'
          }));
        case 7:
          _context5.next = 9;
          return product.destroy();
        case 9:
          _context5.next = 11;
          return MongoProduct.deleteOne({
            sqlID: id
          });
        case 11:
          result = _context5.sent;
          if (!(result.deletedCount === 0)) {
            _context5.next = 14;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'Product not found'
          }));
        case 14:
          res.json({
            message: 'Product removed successfully'
          });
          _context5.next = 21;
          break;
        case 17:
          _context5.prev = 17;
          _context5.t0 = _context5["catch"](1);
          console.error(_context5.t0.message);
          res.status(500).send('Server Error');
        case 21:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 17]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
module.exports = router;