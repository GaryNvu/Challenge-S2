const jwt = require('jsonwebtoken');
const { User } = require('../models');
const secretKey = process.env.JWT_SECRET; // Utilisez une clé plus sécurisée en production

const authenticate  = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findByPk(decoded.user_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  console.log(authHeader);
  console.log(token);

  if (token == null) {
    return res.sendStatus(401); 
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.sendStatus(403); // Token invalide
    req.user = user;
    next();
  });
};

const authorize = (roles = []) => {
  return async (req, res, next) => {
    if (typeof roles === 'string') {
      roles = [roles];
    }

    const user = await User.findByPk(req.user.id);
    console.log(user.role);
    if (!user || !roles.includes(user.role)) {
      return res.status(403).send({ error: 'Forbidden' });
    }

    next();
  };
};

module.exports = { authenticate, authenticateToken, authorize };