const { Router } = require('express');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

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
  console.log(passwordMatch);
    if (!passwordMatch) {
      console.log('Mot de passe en clair:', password);
      console.log('Mot de passe haché:', user.password);
      return res.status(401).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({
    token,
    user: {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email
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

    // Créer un nouvel utilisateur
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      cart: []
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
