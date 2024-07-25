const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('../../routes/product'); // Ensure this path is correct

const app = express();
app.use(bodyParser.json());
app.use('/api', productRoutes);  // Assuming all product routes are prefixed with `/api` in your main server setup

jest.mock('../../mongo/Product', () => ({
    findOneAndUpdate: jest.fn().mockResolvedValue(true),
    find: jest.fn().mockResolvedValue([]),
    findById: jest.fn().mockResolvedValue(null),
    deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 })
}));

const MongoProduct = require('../../mongo/Product');
const denormalizeProduct = require('../../service/denormalization/product');
jest.mock('../../service/denormalization/product');

jest.mock('../../models', () => {
    const SequelizeMock = require('sequelize-mock');
    const dbMock = new SequelizeMock();
    return {
        Product: dbMock.define('product', {
            id: 1,
            name: 'Test Product',
            price: 100,
            description: 'Test Description',
            weight: 1.5,
            condition: 'New',
            language: 'English',
            stock: 10,
            image: 'path/to/image.jpg'
        }),
        Brand: dbMock.define('brand', {
            id: 1,
            name: 'Test Brand'
        }, {
            findByPk: jest.fn().mockResolvedValue({ id: 1, name: 'Test Brand' })
          }),
        Category: dbMock.define('category', {
            id: 1,
            name: 'Test Category'
        }, {
            findByPk: jest.fn().mockResolvedValue({ id: 1, name: 'Test Category' })
          }),
    };
});

describe('Product Routes', () => {
    describe('GET /api/product', () => {
        it('should return all products', async () => {
            const res = await request(app).get('/api/product');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });

    /*describe('POST /api/product', () => {
        it('should create a product', async () => {
            const productData = {
                name: 'New Product',
                price: 200,
                brand_id: 1,
                category_id: 1,
                description: 'New Description',
                weight: 2,
                condition: 'New',
                language: 'English',
                stock: 20,
                image: 'image.jpg'
            };
            const res = await request(app).post('/api/product').send(productData);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('name', 'New Product');
            expect(res.body).toHaveProperty('price', 200);
        });
    
        it('should return 400 if required fields are missing', async () => {
            const incompleteData = {
                name: 'Incomplete Product',
                // price is missing
                brand_id: 1,
                category_id: 1,
                description: 'Incomplete Description',
            };
            const res = await request(app).post('/api/product').send(incompleteData);
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty('message', expect.any(String));
        });
    });*/
});
