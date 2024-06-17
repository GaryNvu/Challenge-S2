import express from "express";
import { MongoClient } from "mongodb";
import cors from 'cors';

async function start() {
  const url = `mongodb+srv://challenge-s2:M8P1acAtfshWAE7w@cluster0.uzoqctd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

  await client.connect();
  const db = client.db('fsv-db');

  const server = express();
  server.use(cors());
  server.use(express.json()); // Middleware to parse JSON bodies


  // Route to get all products
  server.get('/products', async (req, res) => {

    const products = await db.collection('products').find({}).toArray();
    res.send(products);
  });

  async function populateCartIds(ids) {
    try {
      return await Promise.all(ids.map(async id => await db.collection('products').findOne({ id })));
    } catch (error) {
      console.error('An error occurred while populating cart IDs:', error);
      throw error;
    }
  }

  server.get('/users/:userid/cart', async (req, res) => {
    try {

      const user = await db.collection('users').findOne({ id: req.params.userid });

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      if (!user.cartItems) {
        res.status(400).json({ error: 'User cartItems is null' });
        return;
      }

      const populatedCart = await populateCartIds(user.cartItems);
      res.json(populatedCart);
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      await client.close();
    }
  });



  server.get('/products/:productid', async (req, res) => {
    const productid = req.params.productid;
    const product = await db.collection('products').findOne({ id: productid });
    res.json(product);
  });


  server.post('/users/:userid/cart', async (req, res) => {
    try {
      const userid = req.params.userid;
      const productid = req.body.id;

      if (!userid || !productid) {
        return res.status(400).json({ error: 'User ID and Product ID are required' });
      }

      await db.collection('users').updateOne(
        { id: userid },
        { $addToSet: { cartItems: productid } }
      );

      const user = await db.collection('users').findOne({ id: userid });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const populateCart = await populateCartIds(user.cartItems);
      res.json(populateCart);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      res.status(500).json({ error: 'An error occurred while adding the item to the cart' });
    }
  });

  server.delete('/users/:userid/cart/:productid', async (req, res) => {
    const userid = req.params.userid;
    const productid = req.params.productid;
    await db.collection('users').updateOne({ id: userid }, {
      $pull: { cartItems: productid },
    });

    const user = await db.collection('users').findOne({ id: req.params.userid });
    const populateCart = await populateCartIds(user.cartItems);
    res.json(populateCart);
  })


  // Start the server
  server.listen(8000, "0.0.0.0", () => {
    console.log("Server listening on http://localhost:8000");
  });
}

start();