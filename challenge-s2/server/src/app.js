const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('../src/config/db');
const userRoutes = require('../src/routes/users');

const app = express();

app.use(bodyParser.json());

app.use('/api', userRoutes);

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
