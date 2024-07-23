"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var jwt = require('jsonwebtoken');
var _require = require('../models'),
  User = _require.User;
var secretKey = process.env.JWT_SECRET; // Utilisez une clé plus sécurisée en production

var authenticate = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, decoded, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          token = req.header('Authorization').replace('Bearer ', '');
          if (token) {
            _context.next = 3;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            message: 'Access denied. No token provided.'
          }));
        case 3:
          _context.prev = 3;
          decoded = jwt.verify(token, secretKey);
          _context.next = 7;
          return User.findByPk(decoded.user_id);
        case 7:
          user = _context.sent;
          if (user) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(404).json({
            message: 'User not found.'
          }));
        case 10:
          res.json(user);
          _context.next = 16;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](3);
          res.status(400).json({
            message: 'Invalid token.'
          });
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 13]]);
  }));
  return function authenticate(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var authenticateToken = function authenticateToken(req, res, next) {
  var authHeader = req.headers.authorization;
  var token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, secretKey, function (err, user) {
    if (err) return res.sendStatus(403); // Token invalide
    req.user = user;
    next();
  });
};
var authorize = function authorize() {
  var roles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
      var user;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (typeof roles === 'string') {
              roles = [roles];
            }
            _context2.next = 3;
            return User.findByPk(req.user.id);
          case 3:
            user = _context2.sent;
            if (!(!user || !roles.includes(user.role))) {
              _context2.next = 6;
              break;
            }
            return _context2.abrupt("return", res.status(403).send({
              error: 'Forbidden'
            }));
          case 6:
            next();
          case 7:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }();
};
module.exports = {
  authenticate: authenticate,
  authenticateToken: authenticateToken,
  authorize: authorize
};