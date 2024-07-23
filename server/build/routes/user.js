"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _require = require('express'),
  Router = _require.Router;
var _require2 = require('../models'),
  User = _require2.User;
var bcryptjs = require('bcryptjs');
var _require3 = require('../middleware/auth'),
  authenticateToken = _require3.authenticateToken;
var router = Router();

// GET ALL user
router.get('/user', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return User.findAll();
        case 2:
          user = _context.sent;
          res.json(user);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.get('/user/me', authenticateToken, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return User.findByPk(req.user.user_id);
        case 3:
          user = _context2.sent;
          if (user) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 6:
          res.json(user);
          _context2.next = 12;
          break;
        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          res.status(500).send('Server Error');
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 9]]);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// GET user by ID
router.get('/user/:id', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return User.findByPk(id);
        case 4:
          user = _context3.sent;
          if (user) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 7:
          res.json(user);
          _context3.next = 14;
          break;
        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0.message);
          res.status(500).send('Server Error');
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 10]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

// POST user
router.post('/user', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body, firstname, lastname, email, role, password, cart, hashedPassword, user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, firstname = _req$body.firstname, lastname = _req$body.lastname, email = _req$body.email, role = _req$body.role, password = _req$body.password, cart = _req$body.cart;
          _context4.next = 3;
          return bcryptjs.hash(password, 10);
        case 3:
          hashedPassword = _context4.sent;
          _context4.prev = 4;
          _context4.next = 7;
          return User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            role: role,
            password: hashedPassword,
            cart: cart
          });
        case 7:
          user = _context4.sent;
          res.status(201).json(user);
          _context4.next = 14;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](4);
          res.status(500).json({
            error: 'Server error'
          });
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[4, 11]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

// PUT user by ID
router.put('/user/:id', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, _req$body2, firstname, lastname, email, role, password, cart, user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, firstname = _req$body2.firstname, lastname = _req$body2.lastname, email = _req$body2.email, role = _req$body2.role, password = _req$body2.password, cart = _req$body2.cart;
          _context5.prev = 2;
          _context5.next = 5;
          return User.findByPk(id);
        case 5:
          user = _context5.sent;
          if (user) {
            _context5.next = 8;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 8:
          user.firstname = firstname;
          user.lastname = lastname;
          user.email = email;
          user.role = role;
          user.password = password;
          user.cart = cart;
          _context5.next = 16;
          return user.save();
        case 16:
          res.json(user);
          _context5.next = 23;
          break;
        case 19:
          _context5.prev = 19;
          _context5.t0 = _context5["catch"](2);
          console.error(_context5.t0.message);
          res.status(500).send('Server Error');
        case 23:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[2, 19]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

// DELETE user by ID
router["delete"]('/user/:id', /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, user;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.prev = 1;
          _context6.next = 4;
          return User.findByPk(id);
        case 4:
          user = _context6.sent;
          if (user) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'User not found'
          }));
        case 7:
          _context6.next = 9;
          return user.destroy();
        case 9:
          res.json({
            message: 'User deleted successfully'
          });
          _context6.next = 16;
          break;
        case 12:
          _context6.prev = 12;
          _context6.t0 = _context6["catch"](1);
          console.error(_context6.t0.message);
          res.status(500).send('Server Error');
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