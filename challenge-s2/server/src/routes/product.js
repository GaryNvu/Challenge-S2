const { Router } = require('express');
const { Product, Category, Brand } = require('../models');
const MongoProduct = require('../mongo/Product');

const router = Router();

// GET ALL product
router.get('/product', async (req, res) => {
  const { category, brand, minPrice, maxPrice, inStock, search } = req.query;

  console.log("Query object:", req.query);
  console.log("Destructured - Category:", category);
  console.log("Destructured - Brand:", brand);
  console.log("Destructured - MinPrice:", minPrice);
  console.log("Destructured - MaxPrice:", maxPrice);
  console.log("Destructured - InStock:", inStock);

  let query = {};

  if (search) {
    query.$or = [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }];
  }
  if (category) {
    query.category = category;
  }
  if (brand) {
    query.brand = brand;
  }
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) {
      query.price.$gte = Number(minPrice);
    }
    if (maxPrice) {
      query.price.$lte = Number(maxPrice);
    }
  }

  console.log("Mongo query:", query);

  try {
    const products = await MongoProduct.find(query);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET product by ID
router.get('/product/:id', async (req, res) => {
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
router.post('/product', async (req, res) => {
    const { name, price, brand_id, category_id, description, weight, stock, image } = req.body;
    try {
      const brand = await Brand.findByPk(brand_id);
      const category = await Category.findByPk(category_id);

      if (!brand) {
        return res.status(400).json({ msg: 'Brand not found' });
      }
      
      if (!category) {
        return res.status(400).json({ msg: 'Category not found' });
      }

      const product = await Product.create({ name, price, brand_id, category_id, description, weight, stock, image });
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // PUT product (update)
  router.put('/product/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, brand_id, category_id, description, weight, stock, image } = req.body;
    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
      
      const brand = await Brand.findByPk(brand_id);
      const category = await Category.findByPk(category_id);
      
      if (!brand) {
        return res.status(400).json({ msg: 'Brand not found' });
      }
      
      if (!category) {
        return res.status(400).json({ msg: 'Category not found' });
      }
      
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
      await product.update({ name, price, brand_id, category_id, description, weight, stock, image });
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // DELETE product
  router.delete('/product/:id', async (req, res) => {
    const { id } = req.params;
    try {
      console.log("sql");
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ msg: 'Product not found' });
      }
      await product.destroy();

      console.log("mongo");
      const result = await MongoProduct.deleteOne({ sqlID: id });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product removed successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  module.exports = router;