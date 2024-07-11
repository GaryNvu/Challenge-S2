const { Router } = require('express');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const router = Router();

router.post("/login", async (req, res, next) => {
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

  res.json({
    token,
  });
});

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Créer un nouvel utilisateur
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
