const SequelizeMock = require('sequelize-mock');
const migration = require('../../migrations/20240714213551-add-brand-category-to-products');

const dbMock = new SequelizeMock();
const queryInterfaceMock = dbMock.getQueryInterface();

// Mock the addColumn and removeColumn methods
queryInterfaceMock.addColumn = jest.fn();
queryInterfaceMock.removeColumn = jest.fn();

describe('20240714213551-add-brand-category-to-products', () => {
    beforeEach(() => {
        queryInterfaceMock.addColumn.mockClear();
        queryInterfaceMock.removeColumn.mockClear();
    });

    it('adds brand_id and category_id columns to Product table', async () => {
        await migration.up(queryInterfaceMock, SequelizeMock);
        expect(queryInterfaceMock.addColumn).toHaveBeenCalledWith('Product', 'brand_id', expect.any(Object));
        expect(queryInterfaceMock.addColumn).toHaveBeenCalledWith('Product', 'category_id', expect.any(Object));
    });

    it('removes brand_id and category_id columns from Product table', async () => {
        await migration.down(queryInterfaceMock, SequelizeMock);
        expect(queryInterfaceMock.removeColumn).toHaveBeenCalledWith('Product', 'brand_id');
        expect(queryInterfaceMock.removeColumn).toHaveBeenCalledWith('Product', 'category_id');
    });
});