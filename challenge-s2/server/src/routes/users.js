const { Router } = require('express');
const { User } = require('../models');
const bcryptjs = require('bcryptjs');

const router = Router();

router.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post('/users', async (req, res) => {
  const { firstname, lastname, email, password, cart } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);
  try {
    const user = await User.create({ firstname, lastname, email, password: hashedPassword, cart });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;