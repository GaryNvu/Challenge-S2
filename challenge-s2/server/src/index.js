import express from "express";
import cors from 'cors';
import { MongoClient } from "mongodb";
import cors from 'cors';

async function start() {
  const url = `mongodb+srv://challenge-s2:M8P1acAtfshWAE7w@cluster0.uzoqctd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

  await client.connect();
  const db = client.db('fsv-db');

  const server = express();
<<<<<<< HEAD
  server.use(cors())
=======
  server.use(cors());
>>>>>>> a9344985ba47230b8923b5a1e0b302769ffa5782
  server.use(express.json()); // Middleware to parse JSON bodies

  // Route to get all products
  server.get('/products', async (req, res) => {

    const products = await db.collection('products').find({}).toArray();
    res.send(products);
  });

  // Route to get all users
  server.get('/users', async (req, res) => {
    const users = await db.collection('users').find({}).toArray();
    res.send(users);
  });

  server.post('/cart', async (req, res) => {
    try {
      const { userId, productId, amount } = req.body;
  
      if (!userId || !productId || !amount) {
        return res.status(400).send('Missing required fields: userId, productId, amount');
      }
  
      const user = await db.collection('users').findOne({ id: userId });
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      const product = await db.collection('products').findOne({ id: productId });
      if (!product) {
        return res.status(404).send('Product not found');
      }
  
      const cartItems = user.cartItems || [];
      const cartItem = user.cartItems.find(item => item.id === productId);
      if (cartItem) {
        cartItem.amount += amount;
      } else {
        user.cartItems.push({ productId, amount });
      }
  
      await db.collection('users').updateOne({ id: userId }, { $set: { cartItems: user.cartItems } });
  
      res.status(200).send('Product added to cart');
    } catch (error) {
      console.error('An error occurred while adding product to cart:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  server.get('/cart/:userid', async (req, res) => {
    try {
      const userid = req.params.userid;
      const user = await db.collection('users').findOne({ id: userid });

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      if (!user.cartItems) {
        res.status(400).json({ error: 'User cartItems is null' });
        return;
      }

      const populatedCart = await populateCartIds(user.cartItems, db);
      res.json(populatedCart);
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  async function populateCartIds(cartItems) {
    const populatedCart = [];
    for (const item of cartItems) {
      const product = await db.collection('products').findOne({ id: item.productId });
      if (product) {
        populatedCart.push({ ...product, amount: item.amount });
      }
    }
    return populatedCart;
  }

  server.delete('/cart/:userid/:productid', async (req, res) => {
    try {
      const userid = req.params.userid;
      const productid = req.params.productid;

      const filter = { id: userid };
      const update = { $pull: { cartItems: { productId: productid } } };
      const options = { returnOriginal: false };

      const result = await db.collection('users').findOneAndUpdate(filter, update, options);
      const updatedUser = result;

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      const updatedCartItems = updatedUser.cartItems || [];
      const populatedCart = await populateCartIds(updatedCartItems);
      res.json(populatedCart);
    } catch (error) {
      console.error('Error removing product from cart:', error);
      res.status(500).json({ error: 'An error occurred while removing the product from the cart' });
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