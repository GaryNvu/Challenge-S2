"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var _require = require('express'),
  Router = _require.Router;
var _require2 = require('../models'),
  Order = _require2.Order,
  OrderItem = _require2.OrderItem,
  User = _require2.User,
  Product = _require2.Product;
var router = Router();
router.get('/order', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var orders;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Order.findAll();
        case 3:
          orders = _context.sent;
          res.json(orders);
          _context.next = 11;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          res.status(500).json({
            message: 'Unable to fetch orders'
          });
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/order/:id', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, order;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return Order.findByPk(id, {
            include: [{
              model: OrderItem,
              include: [Product]
            }]
          });
        case 4:
          order = _context2.sent;
          if (order) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Order not found'
          }));
        case 7:
          res.json(order);
          _context2.next = 14;
          break;
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](1);
          console.error(_context2.t0);
          res.status(500).json({
            message: 'Unable to fetch order'
          });
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
router.post('/order', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, userId, cartItems, address, total, paymentMethod, shippingFee, discountCode, taxAmount, newOrder, _iterator, _step, item, product;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, userId = _req$body.userId, cartItems = _req$body.cartItems, address = _req$body.address, total = _req$body.total, paymentMethod = _req$body.paymentMethod, shippingFee = _req$body.shippingFee, discountCode = _req$body.discountCode, taxAmount = _req$body.taxAmount;
          _context3.prev = 1;
          _context3.next = 4;
          return Order.create({
            userId: userId,
            address: address,
            total: total,
            paymentMethod: paymentMethod,
            shippingFee: shippingFee,
            discountCode: discountCode,
            taxAmount: taxAmount
          });
        case 4:
          newOrder = _context3.sent;
          _iterator = _createForOfIteratorHelper(cartItems);
          _context3.prev = 6;
          _iterator.s();
        case 8:
          if ((_step = _iterator.n()).done) {
            _context3.next = 17;
            break;
          }
          item = _step.value;
          _context3.next = 12;
          return Product.findByPk(item.productId);
        case 12:
          product = _context3.sent;
          _context3.next = 15;
          return OrderItem.create({
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: product.price,
            total: product.price * item.quantity
          });
        case 15:
          _context3.next = 8;
          break;
        case 17:
          _context3.next = 22;
          break;
        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](6);
          _iterator.e(_context3.t0);
        case 22:
          _context3.prev = 22;
          _iterator.f();
          return _context3.finish(22);
        case 25:
          res.status(201).json(newOrder);
          _context3.next = 32;
          break;
        case 28:
          _context3.prev = 28;
          _context3.t1 = _context3["catch"](1);
          console.error(_context3.t1);
          res.status(500).json({
            message: 'Unable to create order'
          });
        case 32:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 28], [6, 19, 22, 25]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router["delete"]('/order/:id', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, order;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          _context4.next = 4;
          return Order.findByPk(id);
        case 4:
          order = _context4.sent;
          if (order) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Order not found'
          }));
        case 7:
          _context4.next = 9;
          return order.destroy();
        case 9:
          res.json({
            message: 'Order deleted'
          });
          _context4.next = 16;
          break;
        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](1);
          console.error(_context4.t0);
          res.status(500).json({
            message: 'Unable to delete order'
          });
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 12]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.post('/order-items', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var _req$body2, orderId, productId, quantity, price, orderItem;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _req$body2 = req.body, orderId = _req$body2.orderId, productId = _req$body2.productId, quantity = _req$body2.quantity, price = _req$body2.price;
          _context5.prev = 1;
          _context5.next = 4;
          return OrderItem.create({
            orderId: orderId,
            productId: productId,
            quantity: quantity,
            price: price,
            total: price * quantity
          });
        case 4:
          orderItem = _context5.sent;
          res.status(201).json(orderItem);
          _context5.next = 12;
          break;
        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          console.error(_context5.t0);
          res.status(500).json({
            message: 'Unable to add order item'
          });
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 8]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
router["delete"]('/order-items/:id', /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, orderItem;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.prev = 1;
          _context6.next = 4;
          return OrderItem.findByPk(id);
        case 4:
          orderItem = _context6.sent;
          if (orderItem) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'Order item not found'
          }));
        case 7:
          _context6.next = 9;
          return orderItem.destroy();
        case 9:
          res.json({
            message: 'Order item deleted'
          });
          _context6.next = 16;
          break;
        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](1);
          console.error(_context6.t0);
          res.status(500).json({
            message: 'Unable to delete order item'
          });
        case 16:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 12]]);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
module.exports = router;