const { Router } = require('express');
const { Brand } = require('../models');

const router = Router();

// GET ALL categories
router.get('/brand', async (req, res) => {
  try {
    const brand = await Brand.findAll();
    res.json(brand);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET Brand by ID
router.get('/brand/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }
    res.json(brand);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST brand
router.post('/brand', async (req, res) => {
  const { name } = req.body;
  try {
    const brand = await Brand.create({ name });
    res.json(brand);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT brand (update)
router.put('/brand/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ msg: 'Brand not found' });
    }
    await brand.update({ name });
    res.json(brand);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE brand
router.delete('/brand/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findByPk(id);
    if (!brand) {
      return res.status(404).json({ msg: 'Brand not found' });
    }
    await brand.destroy();
    res.json({ msg: 'Brand deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;