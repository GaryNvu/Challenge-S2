const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticate, authenticateToken, authorize } = require('../../middleware/auth');
const { User } = require('../../models');

// Mock the User model
jest.mock('../../models', () => ({
    User: {
        findByPk: jest.fn(),
    },
}));

jest.mock('jsonwebtoken');

const app = express();
app.use(express.json());

// Mock routes for testing
app.get('/protected', authenticate, (req, res) => res.json(req.user));
app.get('/token', authenticateToken, (req, res) => res.send('Token Route'));
app.get('/admin', authenticateToken, authorize('admin'), (req, res) => res.send('Admin Route'));

describe('Authentication Middleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('authenticate - success', async () => {
        const mockUser = { id: 1, username: 'testuser' };
        const mockToken = 'mockToken';
        const mockDecoded = { user_id: mockUser.id };

        jwt.verify.mockReturnValue(mockDecoded);
        User.findByPk.mockResolvedValue(mockUser);

        const response = await request(app)
            .get('/protected')
            .set('Authorization', `Bearer ${mockToken}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockUser);
    });

    test('authenticate - no token', async () => {
        const response = await request(app).get('/protected');

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Access denied. No token provided.' });
    });

    test('authenticate - invalid token', async () => {
        const mockToken = 'invalidToken';

        jwt.verify.mockImplementation(() => {
            throw new Error('Invalid token');
        });

        const response = await request(app)
            .get('/protected')
            .set('Authorization', `Bearer ${mockToken}`);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Invalid token.' });
    });

    test('authenticateToken - success', async () => {
        const mockUser = { id: 1, username: 'testuser' };
        const mockToken = 'mockToken';

        jwt.verify.mockReturnValue(mockUser);

        const response = await request(app)
            .get('/token')
            .set('Authorization', `Bearer ${mockToken}`);

        expect(response.status).toBe(200);
        expect(response.text).toBe('Token Route');
    }, 10000); // Increase the timeout if needed

    test('authenticateToken - no token', async () => {
        const response = await request(app).get('/token');

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Access denied. No token provided.' });
    }, 10000);

    test('authenticateToken - invalid token', async () => {
        const mockToken = 'invalidToken';

        jwt.verify.mockImplementation(() => {
            throw new Error('Invalid token');
        });

        const response = await request(app)
            .get('/token')
            .set('Authorization', `Bearer ${mockToken}`);

        expect(response.status).toBe(403);
        expect(response.body).toEqual({ message: 'Invalid token.' });
    }, 10000);

    test('authorize - success', async () => {
        const mockUser = { id: 1, role: 'admin' };
        const mockToken = 'mockToken';

        jwt.verify.mockReturnValue(mockUser);
        User.findByPk.mockResolvedValue(mockUser);

        const response = await request(app)
            .get('/admin')
            .set('Authorization', `Bearer ${mockToken}`);

        expect(response.status).toBe(200);
        expect(response.text).toBe('Admin Route');
    }, 10000);

    test('authorize - forbidden', async () => {
        const mockUser = { id: 1, role: 'user' };
        const mockToken = 'mockToken';

        jwt.verify.mockReturnValue(mockUser);
        User.findByPk.mockResolvedValue(mockUser);

        const response = await request(app)
            .get('/admin')
            .set('Authorization', `Bearer ${mockToken}`);

        expect(response.status).toBe(403);
        expect(response.body).toEqual({ error: 'Forbidden' });
    }, 10000);

    test('authenticate - no token', async () => {
        const response = await request(app).get('/protected');

        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Access denied. No token provided.' });
    });

    test('authenticateToken - invalid token', async () => {
        const mockToken = 'invalidToken';

        jwt.verify.mockImplementation(() => {
            throw new Error('Invalid token');
        });

        const response = await request(app)
            .get('/token')
            .set('Authorization', `Bearer ${mockToken}`);

        expect(response.status).toBe(403);
        expect(response.body).toEqual({ message: 'Invalid token.' });
    }, 10000); // Increase timeout if needed


    test('authorize - admin route success', async () => {
        const mockAdmin = { id: 2, username: 'adminuser', role: 'admin' };
        const mockToken = 'adminToken';
        const mockDecoded = { user_id: mockAdmin.id };

        jwt.verify.mockReturnValue(mockDecoded);
        User.findByPk.mockResolvedValue(mockAdmin);

        const response = await request(app)
            .get('/admin')
            .set('Authorization', `Bearer ${mockToken}`);
        expect(response.status).toBe(200);
        expect(response.text).toEqual('Admin Route');
    });

    test('authorize - admin route unauthorized', async () => {
        const mockUser = { id: 3, username: 'regularuser', role: 'user' };
        const mockToken = 'userToken';
        const mockDecoded = { user_id: mockUser.id };

        jwt.verify.mockReturnValue(mockDecoded);
        User.findByPk.mockResolvedValue(mockUser);

        const response = await request(app)
            .get('/admin')
            .set('Authorization', `Bearer ${mockToken}`);
        expect(response.status).toBe(403);
        expect(response.body).toEqual({ error: 'Forbidden' });
    });
});
