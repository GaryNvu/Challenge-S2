const { Router } = require('express');
const { User } = require('../models');
const bcryptjs = require('bcryptjs');

const router = Router();

// GET ALL user
router.get('/user', async (req, res) => {
  const user = await User.findAll();
  res.json(user);
});

// GET user by ID
router.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST user
router.post('/user', async (req, res) => {
  const { firstname, lastname, email, password, cart } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);
  try {
    const user = await User.create({ firstname, lastname, email, password: hashedPassword, cart });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT user by ID
router.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, email, password, cart } = req.body;
  try {
    let user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = password;
    user.cart = cart;
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE user by ID
router.delete('/user/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;