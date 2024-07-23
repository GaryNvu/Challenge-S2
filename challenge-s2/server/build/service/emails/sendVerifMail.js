"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var axios = require('axios');

// Configurer le client axios pour utiliser l'API de Brevo
/*const brevoMailer = axios.create({
  baseURL: 'https://api.brevo.com/v3/smtp/email', // Remplacez par l'URL de base correcte fournie par Brevo
  headers: {
    'api-key': `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`, // Remplacez par votre clé API réelle
    'Content-Type': 'application/json'
  }
});*/
function sendVerificationEmail(_x, _x2) {
  return _sendVerificationEmail.apply(this, arguments);
}
function _sendVerificationEmail() {
  _sendVerificationEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userEmail, verificationToken) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          /*const mailOptions = {
            from: 'garyneveu14@gmail.com', // L'adresse email utilisée comme expéditeur
            to: userEmail,
            subject: 'Veuillez vérifier votre adresse email',
            html: `
              <h1>Vérification Email</h1>
              <p>Merci de vous être inscrit sur notre site. Veuillez cliquer sur le lien ci-dessous pour vérifier votre email.</p>
              <a href="http://localhost:3000/verify-email?token=${verificationToken}">Vérifier Email</a>
            ` // Assurez-vous que l'URL est correcte pour votre environnement
          };
              try {
            await brevoMailer.post('/send', mailOptions); // Utilisez le bon endpoint selon la documentation de Brevo
            console.log('Email de vérification envoyé avec succès à:', userEmail);
          } catch (error) {
            console.error('Erreur lors de l’envoi de l’email de vérification:', error);
            throw error;
          }*/
          console.log("Not Functional");
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _sendVerificationEmail.apply(this, arguments);
}
;
module.exports = sendVerificationEmail;