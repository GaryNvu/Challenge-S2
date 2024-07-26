const axios = require('axios');

// Configurer le client axios pour utiliser l'API de Brevo
/*const brevoMailer = axios.create({
  baseURL: 'https://api.brevo.com/v3/smtp/email',
  headers: {
    'api-key': `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`, 
    'Content-Type': 'application/json'
  }
});*/

async function sendVerificationEmail(userEmail, verificationToken) {
    /*const mailOptions = {
      from: 'garyneveu14@gmail.com',
      to: userEmail,
      subject: 'Veuillez vérifier votre adresse email',
      html: `
        <h1>Vérification Email</h1>
        <p>Merci de vous être inscrit sur notre site. Veuillez cliquer sur le lien ci-dessous pour vérifier votre email.</p>
        <a href="http://localhost:3000/verify-email?token=${verificationToken}">Vérifier Email</a>
      `
    };
  
    try {
      await brevoMailer.post('/send', mailOptions);
      console.log('Email de vérification envoyé avec succès à:', userEmail);
    } catch (error) {
      console.error('Erreur lors de l’envoi de l’email de vérification:', error);
      throw error;
    }*/
   console.log("Not Functional");
  };

  module.exports = sendVerificationEmail;