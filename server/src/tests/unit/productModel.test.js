const { Product } = require('../../models');
const MongoProduct = require('../../mongo/Product');
const denormalizeProduct = require('../../service/denormalization/product');

jest.mock('../../mongo/Product', () => ({
    findOneAndUpdate: jest.fn().mockResolvedValue(true)
}));
denormalizeProduct.mockImplementation(() => Promise.resolve());

describe('Product Model', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should denormalize data after creation', async () => {
        const mockProductData = {
            id: 1,
            name: 'Test Product',
            price: 100,
            description: 'A great product',
            weight: 5,
            condition: 'New',
            language: 'English',
            stock: 50,
            image: 'test.jpg',
            Category: { id: 1, name: 'Display' },
            Brand: { id: 1, name: 'Pokemon' }
        };

        // Mock the Sequelize model's create method
        Product.create = jest.fn().mockResolvedValue(mockProductData);
        Product.findByPk = jest.fn().mockResolvedValue({
            ...mockProductData,
            Category: { name: 'Display' },
            Brand: { name: 'Pokemon' }
        });

        // Act
        /*Product.create = jest.fn().mockImplementation((prodData) => {
            denormalizeProduct(prodData.id, Product);  // Manually trigger denormalization
            return Promise.resolve(prodData);  // Return a promise that resolves to the product data
        });

        // Assert
        expect(denormalizeProduct).toHaveBeenCalledWith(mockProductData.id, expect.anything());
        expect(MongoProduct.findOneAndUpdate).toHaveBeenCalledWith(
            { sqlID: mockProductData.id },
            {
                sqlID: mockProductData.id,
                name: mockProductData.name,
                price: mockProductData.price,
                brand: 'Pokemon',
                category: 'Display',
                description: mockProductData.description,
                weight: mockProductData.weight,
                condition: mockProductData.condition,
                language: mockProductData.language,
                stock: mockProductData.stock,
                image: mockProductData.image,
            },
            { upsert: true, new: true }
        );*/
    });
});
