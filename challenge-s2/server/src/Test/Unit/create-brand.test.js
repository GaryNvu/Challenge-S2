const migration = require('../../migrations/20240714203551-create-brand');
const { Sequelize, DataTypes } = require('sequelize');

describe('20240714203551-create-brand migration', () => {
    let queryInterface;
    let sequelize;

    beforeEach(() => {
        sequelize = new Sequelize('sqlite::memory:');
        queryInterface = sequelize.getQueryInterface();

        // Mock any specific functions as needed
        queryInterface.createTable = jest.fn().mockResolvedValue(true);
        queryInterface.dropTable = jest.fn().mockResolvedValue(true);
    });

    test('up method should create the Brand table', async () => {
        await migration.up(queryInterface, Sequelize);

        expect(queryInterface.createTable).toHaveBeenCalledWith('Brand', expect.any(Object));
    });

    test('down method should drop the Brand table', async () => {
        await migration.down(queryInterface, Sequelize);

        expect(queryInterface.dropTable).toHaveBeenCalledWith('Brand');
    });
});