"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _require = require('express'),
  Router = _require.Router;
var _require2 = require('../models'),
  Category = _require2.Category;
var router = Router();

// GET ALL category
router.get('/category', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var category;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Category.findAll();
        case 3:
          category = _context.sent;
          res.json(category);
          _context.next = 11;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0.message);
          res.status(500).send('Server Error');
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

// GET category by ID
router.get('/category/:id', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, category;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return Category.findByPk(id);
        case 4:
          category = _context2.sent;
          if (category) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(404).json({
            message: 'Category not found'
          }));
        case 7:
          res.json(category);
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

// POST category
router.post('/category', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var name, category;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          name = req.body.name;
          _context3.prev = 1;
          _context3.next = 4;
          return Category.create({
            name: name
          });
        case 4:
          category = _context3.sent;
          res.json(category);
          _context3.next = 12;
          break;
        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](1);
          console.error(_context3.t0.message);
          res.status(500).send('Server Error');
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

// PUT category (update)
router.put('/category/:id', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, name, category;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          name = req.body.name;
          _context4.prev = 2;
          _context4.next = 5;
          return Category.findByPk(id);
        case 5:
          category = _context4.sent;
          if (category) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            msg: 'Category not found'
          }));
        case 8:
          _context4.next = 10;
          return category.update({
            name: name
          });
        case 10:
          res.json(category);
          _context4.next = 17;
          break;
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](2);
          console.error(_context4.t0.message);
          res.status(500).send('Server Error');
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 13]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());

// DELETE category
router["delete"]('/category/:id', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, category;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return Category.findByPk(id);
        case 4:
          category = _context5.sent;
          if (category) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            msg: 'Category not found'
          }));
        case 7:
          _context5.next = 9;
          return category.destroy();
        case 9:
          res.json({
            msg: 'Category deleted'
          });
          _context5.next = 16;
          break;
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](1);
          console.error(_context5.t0.message);
          res.status(500).send('Server Error');
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 12]]);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
module.exports = router;