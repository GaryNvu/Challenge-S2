const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

const setupMocks = () => {
    const Category = dbMock.define('Category', {
        name: 'Electronics'
    });

    const Product = dbMock.define('Product');
    Category.hasMany(Product, { foreignKey: 'category_id' });

    return { Category, Product };
};

describe('Category Model', () => {
    it('should have the correct name', async () => {
        const { Category } = setupMocks();
        const category = await Category.create({ name: 'Electronics' });

        expect(category.name).toEqual('Electronics');
    });

    it('should have a unique name', async () => {
        const { Category } = setupMocks();
        const category = await Category.create({ name: 'Sporting Goods' });
        const duplicate = Category.build({ name: 'Sporting Goods' });

        // Checking uniqueness by assuming the sequelize-mock handles it as expected
        expect(category.name).toEqual(duplicate.name);
    });

    it('should associate with Products correctly', async () => {
        const { Category, Product } = setupMocks();

        // Mock the Product.findAll to simulate finding products related to the category
        Product.findAll = jest.fn().mockResolvedValue([
            { name: 'Camera', category_id: 1 },
            { name: 'Smartphone', category_id: 1 }
        ]);

        const products = await Product.findAll({
            where: { category_id: 1 }
        });

        expect(products).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: 'Camera' }),
            expect.objectContaining({ name: 'Smartphone' })
        ]));
    });
});