const { sequelize } = require('./src/models'); // Assure-toi que le chemin est correct

const dropAllTables = async () => {
  try {
    await sequelize.drop();
    console.log('All tables dropped successfully.');
  } catch (error) {
    console.error('Error dropping tables:', error);
  } finally {
    await sequelize.close();
  }
};

dropAllTables();