const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

const setupMocks = () => {
    const Brand = dbMock.define('Brand', {
        name: 'Nike'
    });

    const Product = dbMock.define('Product');
    Brand.hasMany(Product, { foreignKey: 'brand_id' });

    return { Brand, Product };
};

describe('Brand Model', () => {
    it('should have the correct name', async () => {
        const { Brand } = setupMocks();
        const brand = await Brand.create({ name: 'Nike' });

        expect(brand.name).toEqual('Nike');
    });

    it('should have a unique name', async () => {
        const { Brand } = setupMocks();
        const brand = await Brand.create({ name: 'Adidas' });
        const duplicate = Brand.build({ name: 'Adidas' });

        expect(brand.name).toEqual(duplicate.name);
    });

    it('should associate with Products correctly', async () => {
        const { Brand, Product } = setupMocks();

        Product.findAll = jest.fn().mockResolvedValue([
            { name: 'Air Max', brand_id: 1 },
            { name: 'Air Force', brand_id: 1 }
        ]);

        const products = await Product.findAll({
            where: { brand_id: 1 }
        });

        expect(products).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: 'Air Max' }),
            expect.objectContaining({ name: 'Air Force' })
        ]));
    });
});
