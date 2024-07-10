const { Router } = require('express');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = Router();

router.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post('/users', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

/* GET user
router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST user
router.post('/users', async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, password]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });*/

module.exports = router;