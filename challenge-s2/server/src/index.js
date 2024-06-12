import express from "express";
import { MongoClient } from "mongodb";
import { cartItems as cartItemsRaw, products as productsRaw } from "./temp-data.js";

let cartItems = cartItemsRaw;
let products = productsRaw;
const url = `mongodb+srv://challenge-s2:M8P1acAtfshWAE7w@cluster0.uzoqctd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(url)
const server = express();
server.use(express.json()); // Middleware to parse JSON bodies

// Root route
server.get("/hello", async (req, res) => {
  await client.connect();
  const db = client.db('fsv-db');
  const products = await db.collection('products').find({}).toArray();
  res.send(products);
});

// Route to get all products
server.get('/products', (req, res) => {
  res.json(products);
});

function populateCartIds(ids) {
  return ids.map(id => products.find(product => product.id === id))
}
// Route to get all cart items
server.get('/cart', (req, res) => {
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
});

// Route to get a specific product by ID
server.get('/products/:productid', (req, res) => {
  const productid = req.params.productid;
  const product = products.find(product => product.id === productid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

// Route to add a product to the cart
server.post('/cart', (req, res) => {
  const productid = req.body.id;
  cartItems.push(productid);
  const populateCart = populateCartIds(cartItems);
  res.json(populateCart);
});

server.delete('/cart/:productid', (req, res) => {
  const productid = req.params.productid;
  cartItems = cartItems.filter(id => id !== productid)
  const populateCart = populateCartIds(cartItems);
  res.json(populateCart);
})

// Start the server
server.listen(8000, "0.0.0.0", () => {
  console.log("Server listening on http://localhost:8000");
});
