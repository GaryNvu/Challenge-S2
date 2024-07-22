const migration = require('../../migrations/20240714183551-create-category');
const { Sequelize, DataTypes } = require('sequelize');

describe('20240714183551-create-category migration', () => {
    let queryInterface;
    let sequelize;

    beforeEach(() => {
        sequelize = new Sequelize('sqlite::memory:');
        queryInterface = sequelize.getQueryInterface();

        // Mock any specific functions as needed
        queryInterface.createTable = jest.fn().mockResolvedValue(true);
        queryInterface.dropTable = jest.fn().mockResolvedValue(true);
    });

    test('up method should create the Category table', async () => {
        await migration.up(queryInterface, Sequelize);

        expect(queryInterface.createTable).toHaveBeenCalledWith('Category', expect.any(Object));
    });

    test('down method should drop the Category table', async () => {
        await migration.down(queryInterface, Sequelize);

        expect(queryInterface.dropTable).toHaveBeenCalledWith('Category');
    });
});