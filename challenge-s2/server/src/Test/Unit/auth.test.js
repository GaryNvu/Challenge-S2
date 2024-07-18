const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticate, authenticateToken, authorize } = require('../../middleware/auth'); // Adjust the path accordingly
const { User } = require('../../models/User.js');

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
app.get('/protected', authenticate, (req, res) => res.send('Protected Route'));
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
    });

    test('authenticateToken - no token', async () => {
        const response = await request(app).get('/token');

        expect(response.status).toBe(401);
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
    });

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
    });

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
    });

    // Continue from the existing tests...

    test('authenticate - no token', async () => {
        const response = await request(app).get('/protected');
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'No token provided');
    });

    test('authenticateToken - invalid token', async () => {
        jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });
        const response = await request(app)
            .get('/token')
            .set('Authorization', 'Bearer invalidToken');
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error', 'Invalid token');
    });

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
        expect(response.body).toHaveProperty('error', 'Not authorized');
    });
});
