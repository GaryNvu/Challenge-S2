const { Router } = require('express');
const { User } = require('../models');
const bcryptjs = require('bcryptjs');

const router = Router();

<<<<<<< HEAD
// GET ALL user
=======
>>>>>>> f3ed5db858415b587f991c480519d7064d3fa8ae
router.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

<<<<<<< HEAD
// GET user by ID
router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
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
=======
>>>>>>> f3ed5db858415b587f991c480519d7064d3fa8ae
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

<<<<<<< HEAD
// PUT user by ID
router.put('/users/:id', async (req, res) => {
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
router.delete('/users/:id', async (req, res) => {
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

=======
>>>>>>> f3ed5db858415b587f991c480519d7064d3fa8ae
module.exports = router;