const request = require('supertest');
const express = require('express');
const { Category } = require('../../models');
const categoryRouter = require('../../routes/category');

const app = express();
app.use(express.json());
app.use('/api', categoryRouter);

// Mock data
const mockCategories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
];

// Mock the Category model
jest.mock('../../models', () => ({
    Category: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
}));

describe('Category API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('GET /api/category should return all categories', async () => {
        Category.findAll.mockResolvedValue(mockCategories);

        const response = await request(app).get('/api/category');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCategories);
    });

    test('GET /api/category/:id should return a category by ID', async () => {
        Category.findByPk.mockResolvedValue(mockCategories[0]);

        const response = await request(app).get('/api/category/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCategories[0]);
    });

    test('GET /api/category/:id should return 404 if category not found', async () => {
        Category.findByPk.mockResolvedValue(null);

        const response = await request(app).get('/api/category/1');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'Category not found' });
    });

    test('POST /api/category should create a new category', async () => {
        const newCategory = { id: 3, name: 'Category 3' };
        Category.create.mockResolvedValue(newCategory);

        const response = await request(app).post('/api/category').send({ name: 'Category 3' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(newCategory);
    });


    test('DELETE /api/category/:id should delete an existing category', async () => {
        const mockCategory = { id: 1, name: 'Category 1', destroy: jest.fn().mockResolvedValue() };

        Category.findByPk.mockResolvedValue(mockCategory);

        const response = await request(app).delete('/api/category/1');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ msg: 'Category deleted' });
    });

    test('DELETE /api/category/:id should return 404 if category not found', async () => {
        Category.findByPk.mockResolvedValue(null);

        const response = await request(app).delete('/api/category/1');

        expect(response.status).toBe(404);
        expect(response.body).toEqual({ msg: 'Category not found' });
    });
});