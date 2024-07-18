const mongoose = require('mongoose');
const denormalizeProduct = require('../../service/denormalization/product');
const Product = require('../../models').Product;
const MongoProduct = require('../../mongo/Product');

jest.mock('mongoose', () => {
    const actualMongoose = jest.requireActual('mongoose');
    return {
        ...actualMongoose,
        Types: {
            ...actualMongoose.Types,
            ObjectId: jest.fn().mockImplementation(() => new actualMongoose.Types.ObjectId('507f1f77bcf86cd799439011'))
        }
    };
});

describe('denormalizeProduct', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should denormalize a product successfully', async () => {
        const productId = '1';
        const mockProduct = {
            id: productId,
            name: 'Test Product',
            price: 100,
            brand: 'Test Brand',
            category: 'Test Category',
            description: 'Test Description',
            weight: 1,
            stock: 10,
            image: 'test-image.jpg',
        };

        Product.findByPk = jest.fn().mockResolvedValue(mockProduct);
        MongoProduct.findOneAndUpdate = jest.fn().mockResolvedValue(true);

        await denormalizeProduct(productId, Product);

        expect(Product.findByPk).toHaveBeenCalledWith(productId);
        expect(MongoProduct.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: new mongoose.Types.ObjectId(productId) },
            {
                name: mockProduct.name,
                price: mockProduct.price,
                brand: mockProduct.brand,
                category: mockProduct.category,
                description: mockProduct.description,
                weight: mockProduct.weight,
                stock: mockProduct.stock,
                image: mockProduct.image,
            },
            { upsert: true }
        );
    });

    it('should handle the case where the product is not found', async () => {
        const productId = '2';
        Product.findByPk = jest.fn().mockResolvedValue(null);

        await denormalizeProduct(productId, Product);

        expect(Product.findByPk).toHaveBeenCalledWith(productId);
        expect(MongoProduct.findOneAndUpdate).not.toHaveBeenCalled();
    });

    it('should log an error if there is a problem denormalizing the product', async () => {
        const productId = '3';
        const error = new Error('Test Error');
        Product.findByPk = jest.fn().mockRejectedValue(error);
        console.error = jest.fn();

        await denormalizeProduct(productId, Product);

        expect(Product.findByPk).toHaveBeenCalledWith(productId);
        expect(console.error).toHaveBeenCalledWith(`Error denormalizing product: ${error.message}`);
    });
});