const { Router } = require('express');
const { Product } = require('../models');

const router = Router();

// GET ALL products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST product
router.post('/products', async (req, res) => {
    const { name, price, brand, categorie, description, weight, stock } = req.body;
    try {
      const product = await Product.create({ name, price, brand, categorie, description, weight, stock });
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  module.exports = router;