const { Router } = require('express');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const router = Router();

router.post("/login", async (req, res, next) => {
<<<<<<< HEAD
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
=======
  const user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.sendStatus(401);
  }
  if (!(await bcryptjs.compare(req.body.password, user.password))) {
    return res.sendStatus(401);
  }

  const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET);
>>>>>>> f3ed5db858415b587f991c480519d7064d3fa8ae

  res.json({
    token,
  });
});

router.post("/register", async (req, res, next) => {
  try {
<<<<<<< HEAD
    const { firstname, lastname, email, password } = req.body;
=======
    const { username, email, password } = req.body;
>>>>>>> f3ed5db858415b587f991c480519d7064d3fa8ae

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

<<<<<<< HEAD
    // Créer un nouvel utilisateur
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      cart: []
=======
    // Hacher le mot de passe
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Créer un nouvel utilisateur
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
>>>>>>> f3ed5db858415b587f991c480519d7064d3fa8ae
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
