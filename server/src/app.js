const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('../src/config/db');
const mongoConnection = require('../src/mongo/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const config = require('./config/config.json');

config.production.host = process.env.POSTGRES_HOST_OVH;
config.production.user = process.env.POSTGRES_USER_OVH;
config.production.password = process.env.POSTGRES_PASSWORD_OVH;
config.production.database = process.env.POSTGRES_DB_OVH;
config.production.port = process.env.POSTGRES_PORT_OVH;

config.development.host = process.env.POSTGRES_HOST_OVH;
config.development.user = process.env.POSTGRES_USER_OVH;
config.development.password = process.env.POSTGRES_PASSWORD_OVH;
config.development.database = process.env.POSTGRES_DB_OVH;
config.development.port = process.env.POSTGRES_PORT_OVH;

const userRoutes = require('../src/routes/user');
const productsRoutes = require('../src/routes/product');
const securityRoutes = require('../src/routes/security');
const cartRoutes = require('../src/routes/cart');
const categoryRoutes = require('../src/routes/category');
const brandRoutes = require('../src/routes/brand');
const orderRoutes = require('../src/routes/order');
const stripeRoutes = require('../src/routes/stripe');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', userRoutes);
app.use('/api', productsRoutes);
app.use('/api', securityRoutes);
app.use('/api', cartRoutes);
app.use('/api', categoryRoutes);
app.use('/api', brandRoutes);
app.use('/api', orderRoutes);
app.use('/api', stripeRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    await sequelize.sync();
    await mongoConnection;
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
