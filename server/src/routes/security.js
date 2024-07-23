const { Router } = require('express');
const { User } = require('../models');
const sendVerificationEmail = require("../service/emails/sendVerifMail");
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');

const router = Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email } 
  });

  if (!user) {
    return res.status(401).json({ message: 'Invalid email' });
  }
  const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

  res.json({
    token,
    user: {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role
    }
  });
});

router.post("/register", async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const verificationToken = crypto.randomBytes(16).toString('hex');

    await sendVerificationEmail(email, verificationToken);

    // Créer un nouvel utilisateur
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      verificationToken,
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    next(error);
  }
});

router.get('/verify-email', async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({
      where: {
        verificationToken: token
      }
    });

    if (!user) {
      return res.status(404).send('Token de vérification invalide ou expiré.');
    }

    user.emailVerified = true;
    user.verificationToken = null; // Nettoyez le token une fois vérifié
    await user.save();

    res.send('Email vérifié avec succès!');
  } catch (error) {
    console.error('Erreur lors de la vérification de l’email:', error);
    res.status(500).send('Erreur interne du serveur');
  }
});

module.exports = router;
