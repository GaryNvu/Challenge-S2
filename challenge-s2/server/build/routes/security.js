"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _require = require('express'),
  Router = _require.Router;
var _require2 = require('../models'),
  User = _require2.User;
var sendVerificationEmail = require("../service/emails/sendVerifMail");
var jwt = require('jsonwebtoken');
var bcryptjs = require('bcryptjs');
var crypto = require('crypto');
var router = Router();
router.post("/login", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _req$body, email, password, user, passwordMatch, token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.next = 3;
          return User.findOne({
            where: {
              email: email
            }
          });
        case 3:
          user = _context.sent;
          if (user) {
            _context.next = 6;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid email'
          }));
        case 6:
          _context.next = 8;
          return bcryptjs.compare(password, user.password);
        case 8:
          passwordMatch = _context.sent;
          if (passwordMatch) {
            _context.next = 11;
            break;
          }
          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid password'
          }));
        case 11:
          token = jwt.sign({
            user_id: user.id
          }, process.env.JWT_SECRET, {
            expiresIn: '1h'
          });
          res.cookie('token', token, {
            httpOnly: true,
            maxAge: 3600000
          });
          res.json({
            token: token,
            user: {
              id: user.id,
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              role: user.role
            }
          });
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/register", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    var _req$body2, firstname, lastname, email, password, existingUser, verificationToken, user;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body2 = req.body, firstname = _req$body2.firstname, lastname = _req$body2.lastname, email = _req$body2.email, password = _req$body2.password; // Vérifier si l'utilisateur existe déjà
          _context2.next = 4;
          return User.findOne({
            where: {
              email: email
            }
          });
        case 4:
          existingUser = _context2.sent;
          if (!existingUser) {
            _context2.next = 7;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'Email already in use'
          }));
        case 7:
          verificationToken = crypto.randomBytes(16).toString('hex');
          _context2.next = 10;
          return sendVerificationEmail(email, verificationToken);
        case 10:
          _context2.next = 12;
          return User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            verificationToken: verificationToken
          });
        case 12:
          user = _context2.sent;
          res.status(201).json({
            message: 'User created successfully',
            user: user
          });
          _context2.next = 19;
          break;
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          next(_context2.t0);
        case 19:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 16]]);
  }));
  return function (_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
router.get('/verify-email', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var token, user;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          token = req.query.token;
          _context3.prev = 1;
          _context3.next = 4;
          return User.findOne({
            where: {
              verificationToken: token
            }
          });
        case 4:
          user = _context3.sent;
          if (user) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).send('Token de vérification invalide ou expiré.'));
        case 7:
          user.emailVerified = true;
          user.verificationToken = null; // Nettoyez le token une fois vérifié
          _context3.next = 11;
          return user.save();
        case 11:
          res.send('Email vérifié avec succès!');
          _context3.next = 18;
          break;
        case 14:
          _context3.prev = 14;
          _context3.t0 = _context3["catch"](1);
          console.error('Erreur lors de la vérification de l’email:', _context3.t0);
          res.status(500).send('Erreur interne du serveur');
        case 18:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 14]]);
  }));
  return function (_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}());
module.exports = router;