const request = require('supertest');
const express = require('express');
const authRoutes = require('../interfaces/authController');
const {
    register,
    login
} = require('../application/services/auth');

jest.mock('../application/services/auth');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth Routes', () => {
    describe('POST /auth/register', () => {
        it('should register a user successfully', async () => {
            const mockUser = {
                id: 1,
                email: 'test@example.com'
            };
            register.mockResolvedValue(mockUser);

            const response = await request(app)
                .post('/auth/register')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(mockUser);
        });

        it('should return 400 if registration fails', async () => {
            register.mockRejectedValue(new Error('Registration failed'));

            const response = await request(app)
                .post('/auth/register')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: 'Registration failed'
            });
        });
    });

    describe('POST /auth/login', () => {
        it('should login a user and return a token', async () => {
            const mockToken = 'token123';
            login.mockResolvedValue({
                token: mockToken
            });

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                token: mockToken
            });
        });

        it('should return 401 if login fails', async () => {
            login.mockRejectedValue(new Error('Login failed'));

            const response = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                });

            expect(response.status).toBe(401);
            expect(response.body).toEqual({
                error: 'Login failed'
            });
        });
    });
});