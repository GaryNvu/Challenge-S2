process.env.JWT_SECRET = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMDY3OTcyMSwiaWF0IjoxNzIwNjc5NzIxfQ.zg2FPnArP6Y_qPDQL053cRBPAs1MazXSd-ljeN6wFJk';
const { authMiddleware } = require('../../middleware/auth.js');
const httpMocks = require('node-mocks-http');
const jwt = require('jsonwebtoken'); // Ensure this import for signing tokens
const secretKey = process.env.JWT_SECRET;

describe('Auth Middleware', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction;

    beforeEach(() => {
        mockRequest = httpMocks.createRequest();
        mockResponse = httpMocks.createResponse();
        nextFunction = jest.fn();
    });

    it('should return 401 if no token is provided', () => {
        authMiddleware(mockRequest, mockResponse, nextFunction);

        expect(mockResponse.statusCode).toBe(401);
        expect(mockResponse._getJSONData()).toEqual({ message: 'Access denied. No token provided.' });
    });

    it('should return 400 for an invalid token', () => {
        mockRequest.headers.authorization = 'Bearer invalidtoken';

        authMiddleware(mockRequest, mockResponse, nextFunction);

        expect(mockResponse.statusCode).toBe(400);
        expect(mockResponse._getJSONData()).toEqual({ message: 'Invalid token.' });
    });

    it('should call next for a valid token', () => {
        const userPayload = { id: '123', name: 'John Doe' };
        const token = jwt.sign(userPayload, secretKey); // Ensure secretKey is used here
        mockRequest.headers.authorization = `Bearer ${token}`;

        authMiddleware(mockRequest, mockResponse, nextFunction);

        expect(nextFunction).toHaveBeenCalled();
        expect(mockRequest.user).toEqual(expect.objectContaining(userPayload)); // Check for a subset
    });
});
