const { Router } = require('express');
const { User } = require('../models');
const bcryptjs = require('bcryptjs');

const router = Router();

router.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post('/users', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);
  try {
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;