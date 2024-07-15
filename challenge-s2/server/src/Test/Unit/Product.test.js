const { Sequelize, DataTypes } = require('sequelize');
const { expect } = require('@jest/globals');
const denormalizeProduct = require('../../service/denormalization/product'); // Adjust the path as necessary

jest.mock('../../service/denormalization/product'); // Mock the denormalizeProduct function

// Define the Product model as in your product.js
const defineProductModel = require('../../models/Product.js');

describe('Product Model', () => {
    const sequelize = new Sequelize('sqlite::memory:');
    const Product = defineProductModel(sequelize, DataTypes);

    beforeAll(async () => {
        await sequelize.sync({ force: true }); // Ensure the database is in a clean state before each test
    });

    afterEach(() => {
        jest.clearAllMocks(); // Clear any previous mock calls
    });

    it('should call denormalizeProduct after creation', async () => {
        const productData = {
            name: 'Test Product',
            price: 100.0,
            brand: 'Test Brand',
            category: 'Test Category',
            description: 'Test Description',
            weight: 1.0,
            stock: 10,
            image: 'test_image_url',
        };

        const product = await Product.create(productData);

        expect(denormalizeProduct).toHaveBeenCalledWith(product.id, Product);
        expect(denormalizeProduct).toHaveBeenCalledTimes(1);
    });

    it('should call denormalizeProduct after update', async () => {
        const productData = {
            name: 'Another Test Product',
            price: 150.0,
            brand: 'Another Test Brand',
            category: 'Another Test Category',
            description: 'Another Test Description',
            weight: 2.0,
            stock: 20,
            image: 'another_test_image_url',
        };

        const product = await Product.create(productData);

        // Update the product
        await product.update({ price: 200.0 });

        expect(denormalizeProduct).toHaveBeenCalledWith(product.id, Product);
        expect(denormalizeProduct).toHaveBeenCalledTimes(2); // Once for creation, once for update
    });
});
