import express from "express";
import { indexRouter } from "./routes/index.js";

const server = express();

server.use("/", (req, res) => {
  res.send("Hello!");
});

server.get('/products', (req, res) => {

})

server.get('/cart', (req, res) => {

})

server.get('/products/:productid', (req, res) => {

})

server.listen(8000, "0.0.0.0", () => {
  console.log("Server listening on http://localhost:8000");
});
