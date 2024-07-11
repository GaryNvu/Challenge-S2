const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('../src/config/db');
const userRoutes = require('../src/routes/users');
const productsRoutes = require('../src/routes/products');
const securityRoutes = require('../src/routes/security');
const protectedRoutes = require('../src/routes/protected');

const app = express();
app.use(bodyParser.json());

app.use('/api', userRoutes);
app.use('/api', productsRoutes);
app.use('/api', securityRoutes);
app.use('/api', protectedRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    await sequelize.sync();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
