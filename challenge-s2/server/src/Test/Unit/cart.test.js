const express = require('express');
const { User } = require('../../models');
const cartRouter = require('../../routes/cart');
const request = require('supertest');

// Mock the User model
jest.mock('../../models', () => ({
    User: {
        findByPk: jest.fn(),
    },
    Product: jest.fn(),
}));

const app = express();
app.use(express.json());
app.use('/api', cartRouter); // Add a base route to prevent conflict

describe('POST /api/add-to-cart', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should add a product to the user cart successfully', async () => {
        const user = {
            id: 1,
            cart: [],
            save: jest.fn().mockResolvedValue(true),
        };
        User.findByPk.mockResolvedValue(user);

        const response = await request(app)
            .post('/api/add-to-cart')
            .send({ userId: 1, productId: 2 });

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Product added to cart successfully');
        expect(User.findByPk).toHaveBeenCalledWith(1);
        expect(user.cart).toContain(2);
        expect(user.save).toHaveBeenCalled();
    });

    it('should return 404 if user not found', async () => {
        User.findByPk.mockResolvedValue(null);

        const response = await request(app)
            .post('/api/add-to-cart')
            .send({ userId: 999, productId: 2 });

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('User not found');
        expect(User.findByPk).toHaveBeenCalledWith(999);
    });

    it('should return 500 if there is a server error', async () => {
        User.findByPk.mockRejectedValue(new Error('Server error'));

        const response = await request(app)
            .post('/api/add-to-cart')
            .send({ userId: 1, productId: 2 });

        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Server error');
        expect(User.findByPk).toHaveBeenCalledWith(1);
    });
});
