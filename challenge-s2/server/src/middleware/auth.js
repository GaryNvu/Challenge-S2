const jwt = require('jsonwebtoken');
const { User } = require('../models');
const secretKey = process.env.JWT_SECRET; // Utilisez une clé plus sécurisée en production

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.user_id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.user_id);

    if (!user) {
      return res.status(403).json({ message: 'User not found.' });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token.' });
  }
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
