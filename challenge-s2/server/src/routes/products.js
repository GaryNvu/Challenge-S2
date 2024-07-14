const { Router } = require('express');
const { Product } = require('../models');
const MongoProduct = require('../mongo/Product');

const router = Router();

// GET ALL products
router.get('/products', async (req, res) => {
  try {
    const products = await MongoProduct.find();
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET product by ID
router.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await MongoProduct.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST product
router.post('/products', async (req, res) => {
    const { name, price, brand, category, description, weight, stock, image } = req.body;
    try {
      const product = await Product.create({ name, price, brand, category, description, weight, stock, image });
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // PUT product (update)
  router.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, brand, category, description, weight, stock, image } = req.body;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
      await product.update({ name, price, brand, category, description, weight, stock, image });
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // DELETE product
  router.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
      await product.destroy();
      res.json({ msg: 'Product deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  module.exports = router;