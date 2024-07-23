"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _require = require('express'),
  Router = _require.Router;
var _require2 = require('../models'),
  Cart = _require2.Cart,
  Product = _require2.Product,
  User = _require2.User;
var router = Router();
router.get('/cart/:userId', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var userId, cartItems;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          userId = req.params.userId;
          _context.next = 4;
          return Cart.findAll({
            where: {
              user_id: userId
            },
            include: [Product]
          });
        case 4:
          cartItems = _context.sent;
          res.json(cartItems);
          _context.next = 12;
          break;
        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Server error'
          });
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 8]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/cart', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, userId, productId, quantity, user, product, cartItem;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, userId = _req$body.userId, productId = _req$body.productId, quantity = _req$body.quantity;
          _context2.prev = 1;
          _context2.next = 4;
          return User.findByPk(userId);
        case 4:
          user = _context2.sent;
          if (user) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 7:
          _context2.next = 9;
          return Product.findByPk(productId);
        case 9:
          product = _context2.sent;
          if (product) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Product not found'
          }));
        case 12:
          _context2.next = 14;
          return Cart.create({
            user_id: userId,
            product_id: productId,
            quantity: quantity
          });
        case 14:
          cartItem = _context2.sent;
          res.json({
            message: 'Product added to cart successfully',
            cartItem: cartItem
          });
          _context2.next = 22;
          break;
        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Server error'
          });
        case 22:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 18]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.put('/cart/:cartId', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var quantity, cartItem;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          quantity = req.body.quantity;
          _context3.prev = 1;
          _context3.next = 4;
          return Cart.findByPk(req.params.cartId);
        case 4:
          cartItem = _context3.sent;
          if (cartItem) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'Cart item not found'
          }));
        case 7:
          cartItem.quantity = quantity;
          _context3.next = 10;
          return cartItem.save();
        case 10:
          res.json({
            message: 'Cart updated successfully',
            cartItem: cartItem
          });
          _context3.next = 17;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0);
          res.status(500).json({
            message: 'Server error'
          });
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 13]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router["delete"]('/cart/:cartId', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var cartItem;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return Cart.findByPk(req.params.cartId);
        case 3:
          cartItem = _context4.sent;
          if (cartItem) {
            _context4.next = 6;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Cart item not found'
          }));
        case 6:
          _context4.next = 8;
          return cartItem.destroy();
        case 8:
          res.json({
            message: 'Product removed from cart successfully'
          });
          _context4.next = 15;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          console.error(_context4.t0);
          res.status(500).json({
            message: 'Server error'
          });
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
module.exports = router;