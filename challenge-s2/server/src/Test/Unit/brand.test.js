const request = require('supertest');
const express = require('express');
const { Brand } = require('../../models');
const brandRouter = require('../../routes/brand');

// Mock the Brand model
jest.mock('../../models', () => ({
    Brand: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
        destroy: jest.fn(),
        update: jest.fn(),
    },
}));

const app = express();
app.use(express.json());
app.use('/api', brandRouter);

describe('Brand API', () => {
    let originalConsoleError;

    beforeAll(() => {
        // Backup the original console.error
        originalConsoleError = console.error;
        // Mock console.error to suppress error messages in test output
        console.error = jest.fn();
    });

    afterAll(() => {
        // Restore the original console.error
        console.error = originalConsoleError;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /api/brand', () => {
        it('should return all brands', async () => {
            const brands = [{ id: 1, name: 'Brand1' }, { id: 2, name: 'Brand2' }];
            Brand.findAll.mockResolvedValue(brands);

            const res = await request(app).get('/api/brand');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(brands);
        });

        it('should handle errors', async () => {
            Brand.findAll.mockRejectedValue(new Error('Database Error'));

            const res = await request(app).get('/api/brand');

            expect(res.statusCode).toEqual(500);
            expect(res.text).toEqual('Server Error');
        });
    });

    describe('GET /api/brand/:id', () => {
        it('should return a brand by id', async () => {
            const brand = { id: 1, name: 'Brand1' };
            Brand.findByPk.mockResolvedValue(brand);

            const res = await request(app).get('/api/brand/1');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(brand);
        });

        it('should return 404 if brand not found', async () => {
            Brand.findByPk.mockResolvedValue(null);

            const res = await request(app).get('/api/brand/1');

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({ message: 'Brand not found' });
        });

        it('should handle errors', async () => {
            Brand.findByPk.mockRejectedValue(new Error('Database Error'));

            const res = await request(app).get('/api/brand/1');

            expect(res.statusCode).toEqual(500);
            expect(res.text).toEqual('Server Error');
        });
    });

    describe('POST /api/brand', () => {
        it('should create a new brand', async () => {
            const newBrand = { id: 1, name: 'Brand1' };
            Brand.create.mockResolvedValue(newBrand);

            const res = await request(app)
                .post('/api/brand')
                .send({ name: 'Brand1' });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(newBrand);
        });

        it('should handle errors', async () => {
            Brand.create.mockRejectedValue(new Error('Database Error'));

            const res = await request(app)
                .post('/api/brand')
                .send({ name: 'Brand1' });

            expect(res.statusCode).toEqual(500);
            expect(res.text).toEqual('Server Error');
        });
    });


    describe('DELETE /api/brand/:id', () => {
        it('should delete a brand', async () => {
            const brand = { id: 1, name: 'Brand1' };
            const mockDestroy = jest.fn().mockResolvedValue();
            Brand.findByPk.mockResolvedValue({
                ...brand,
                destroy: mockDestroy,
            });

            const res = await request(app).delete('/api/brand/1');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({ msg: 'Brand deleted' });
        });

        it('should return 404 if brand not found', async () => {
            Brand.findByPk.mockResolvedValue(null);

            const res = await request(app).delete('/api/brand/1');

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({ msg: 'Brand not found' });
        });

        it('should handle errors', async () => {
            Brand.findByPk.mockRejectedValue(new Error('Database Error'));

            const res = await request(app).delete('/api/brand/1');

            expect(res.statusCode).toEqual(500);
            expect(res.text).toEqual('Server Error');
        });
    });
});