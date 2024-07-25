const request = require('supertest');
const express = require('express');
const { Cart, Product, User } = require('../../models');
const cartRouter = require('../../routes/cart'); // Assuming you've exported your routes to 'cartRouter'

// Mock the models
jest.mock('../../models', () => ({
    Cart: {
        findAll: jest.fn(),
        create: jest.fn(),
        findByPk: jest.fn(),
        destroy: jest.fn()
    },
    Product: {
        findByPk: jest.fn()
    },
    User: {
        findByPk: jest.fn()
    }
}));

const app = express();
app.use(express.json());
app.use('/api', cartRouter);

describe('Cart API Routes', () => {
    describe('GET /api/cart/:userId', () => {
        it('should return all cart items for a user', async () => {
            const mockCartItems = [
                { id: 1, user_id: 1, product_id: 1, quantity: 2 },
                { id: 2, user_id: 1, product_id: 2, quantity: 3 }
            ];
            Cart.findAll.mockResolvedValue(mockCartItems);

            const res = await request(app).get('/api/cart/1');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockCartItems);
        });

        it('should return 500 if there is a server error', async () => {
            Cart.findAll.mockRejectedValue(new Error('Server error'));

            const res = await request(app).get('/api/cart/1');
            expect(res.statusCode).toEqual(500);
            expect(res.body).toEqual({ message: 'Server error' });
        });
    });

    describe('POST /api/cart', () => {
        it('should create a new cart item', async () => {
            const newCartItem = { user_id: 1, product_id: 1, quantity: 1 };
            Cart.create.mockResolvedValue(newCartItem);

            User.findByPk.mockResolvedValue({ id: 1 });
            Product.findByPk.mockResolvedValue({ id: 1 });

            const res = await request(app)
                .post('/api/cart')
                .send({ userId: 1, productId: 1, quantity: 1 });

            expect(res.statusCode).toEqual(200);
            expect(res.body.cartItem).toEqual(newCartItem);
            expect(res.body.message).toEqual('Product added to cart successfully');
        });

        it('should return 404 if user not found', async () => {
            User.findByPk.mockResolvedValue(null);

            const res = await request(app)
                .post('/api/cart')
                .send({ userId: 999, productId: 1, quantity: 1 });

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({ message: 'User not found' });
        });

        it('should return 404 if product not found', async () => {
            User.findByPk.mockResolvedValue({ id: 1 });
            Product.findByPk.mockResolvedValue(null);

            const res = await request(app)
                .post('/api/cart')
                .send({ userId: 1, productId: 999, quantity: 1 });

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({ message: 'Product not found' });
        });
    });

    describe('PUT /api/cart/:cartId', () => {
        it('should update cart item quantity', async () => {
            const updatedCartItem = { id: 1, user_id: 1, product_id: 1, quantity: 5 };
            Cart.findByPk.mockResolvedValue({
                ...updatedCartItem,
                save: jest.fn().mockResolvedValue(updatedCartItem)
            });

            const res = await request(app)
                .put('/api/cart/1')
                .send({ quantity: 5 });

            expect(res.statusCode).toEqual(200);
            expect(res.body.cartItem).toEqual(updatedCartItem);
            expect(res.body.message).toEqual('Cart updated successfully');
        });

        it('should return 404 if cart item not found', async () => {
            Cart.findByPk.mockResolvedValue(null);

            const res = await request(app)
                .put('/api/cart/999')
                .send({ quantity: 5 });

            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({ message: 'Cart item not found' });
        });
    });

    describe('DELETE /api/cart/:cartId', () => {
        it('should delete a cart item', async () => {
            const mockCartItem = { id: 1, destroy: jest.fn().mockResolvedValue() };
            Cart.findByPk.mockResolvedValue(mockCartItem);

            const res = await request(app).delete('/api/cart/1');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({ message: 'Product removed from cart successfully' });
        });

        it('should return 404 if cart item not found', async () => {
            Cart.findByPk.mockResolvedValue(null);

            const res = await request(app).delete('/api/cart/999');
            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({ message: 'Cart item not found' });
        });
    });

    describe('DELETE /api/cart/user/:userId', () => {
        it('should clear the cart for a user', async () => {
            User.findByPk.mockResolvedValue({ id: 1 });
            Cart.destroy.mockResolvedValue();

            const res = await request(app).delete('/api/cart/user/1');
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({ message: 'Cart cleared successfully' });
        });

        it('should return 404 if user not found', async () => {
            User.findByPk.mockResolvedValue(null);

            const res = await request(app).delete('/api/cart/user/999');
            expect(res.statusCode).toEqual(404);
            expect(res.body).toEqual({ message: 'User not found' });
        });
    });
});
