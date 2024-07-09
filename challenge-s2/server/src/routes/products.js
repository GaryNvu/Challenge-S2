import { Router } from 'express';
import pool from '../db.js'; // Assurez-vous d'utiliser l'extension de fichier

const router = Router();

// GET ALL products
router.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST product
router.post('/products', async (req, res) => {
    const { name, price, brand, categorie, description, weight, stock } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO products (name, price, brand, categorie, description, weight, stock) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [name, price, brand, categorie, description, weight, stock]
      );
      res.json(result.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

export default router;