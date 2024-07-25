// security.test.js
const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { User } = require('../../models');

// Mock the dependencies
jest.mock('../../models');
jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

const app = express();
app.use(express.json());
app.use('/api', require('../../routes/security')); // Adjust the path to your router file

describe('Security Routes', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear all mocks after each test
    });

    describe('POST /login', () => {
        it('should login successfully', async () => {
            // Mock the User.findOne method
            User.findOne.mockResolvedValue({
                id: 1,
                password: '$2a$10$examplehash',
                firstname: 'John',
                lastname: 'Doe',
                email: 'test@example.com'
            });

            // Mock bcryptjs.compare method
            bcryptjs.compare.mockResolvedValue(true);

            // Mock jwt.sign method
            jwt.sign.mockReturnValue('exampleToken');

            const response = await request(app)
                .post('/api/login')
                .send({ email: 'test@example.com', password: 'password' });

            expect(response.statusCode).toBe(200);
            expect(response.body.token).toBeDefined();
            expect(response.body.user).toMatchObject({
                id: 1,
                firstname: 'John',
                lastname: 'Doe',
                email: 'test@example.com'
            });
        });

        it('should return 401 for invalid email', async () => {
            User.findOne.mockResolvedValue(null);

            const response = await request(app)
                .post('/api/login')
                .send({ email: 'invalid@example.com', password: 'password' });

            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe('Invalid email');
        });

        it('should return 401 for invalid password', async () => {
            User.findOne.mockResolvedValue({
                id: 1,
                password: '$2a$10$examplehash' // example hashed password
            });
            bcryptjs.compare.mockResolvedValue(false);

            const response = await request(app)
                .post('/api/login')
                .send({ email: 'test@example.com', password: 'wrongpassword' });

            expect(response.statusCode).toBe(401);
            expect(response.body.message).toBe('Invalid password');
        });
    });

    describe('POST /register', () => {
        it('should register a new user successfully', async () => {
            User.findOne.mockResolvedValue(null);
            User.create.mockResolvedValue({
                id: 1,
                firstname: 'John',
                lastname: 'Doe',
                email: 'new@example.com',
                password: 'hashedpassword', // example hashed password
                cart: []
            });

            const response = await request(app)
                .post('/api/register')
                .send({
                    firstname: 'John',
                    lastname: 'Doe',
                    email: 'new@example.com',
                    password: 'password'
                });

            expect(response.statusCode).toBe(201);
            expect(response.body.message).toBe('User created successfully');
            expect(response.body.user).toMatchObject({
                id: 1,
                firstname: 'John',
                lastname: 'Doe',
                email: 'new@example.com'
            });
        });

        it('should return 400 if email is already in use', async () => {
            User.findOne.mockResolvedValue({
                id: 1,
                email: 'existing@example.com'
            });

            const response = await request(app)
                .post('/api/register')
                .send({
                    firstname: 'John',
                    lastname: 'Doe',
                    email: 'existing@example.com',
                    password: 'password'
                });

            expect(response.statusCode).toBe(400);
            expect(response.body.message).toBe('Email already in use');
        });
    });
});