const request = require('supertest');
const express = require('express');
const urlRoutes = require('../interfaces/urlController');
const {
    shortenUrl,
    getUrlByShortCode,
    listUrls
} = require('../application/services/url');

jest.mock('../application/services/url');

const authenticateJWT = jest.fn((req, res, next) => {
    req.user = {
        id: 1
    };
    next();
});

const app = express();
app.use(express.json());
app.use('/urls', authenticateJWT, urlRoutes);

describe('URL Routes', () => {
    describe('POST /urls/shorten', () => {
        it('should shorten a URL successfully', async () => {
            const mockShortUrl = 'short123';
            shortenUrl.mockResolvedValue(mockShortUrl);

            const response = await request(app)
                .post('/urls/shorten')
                .send({
                    originalUrl: 'http://example.com'
                });

            expect(response.status).toBe(200);
        });

        it('should return 400 if URL shortening fails', async () => {
            shortenUrl.mockRejectedValue(new Error('Shortening failed'));

            const response = await request(app)
                .post('/urls/shorten')
                .send({
                    originalUrl: 'http://example.com'
                });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: 'Shortening failed'
            });
        });
    });

    describe('GET /urls/urls', () => {
        it('should list URLs successfully', async () => {
            const mockUrls = [{
                shortUrl: 'short123',
                originalUrl: 'http://example.com'
            }];
            listUrls.mockResolvedValue(mockUrls);

            const response = await request(app)
                .get('/urls/urls');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUrls);
        });

        it('should return 400 if listing URLs fails', async () => {
            listUrls.mockRejectedValue(new Error('Listing failed'));

            const response = await request(app)
                .get('/urls/urls');

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: 'Listing failed'
            });
        });
    });

    describe('GET /urls/:shortUrl', () => {
        it('should redirect to the original URL if shortUrl exists', async () => {
            const mockUrl = {
                originalUrl: 'http://example.com',
                clicks: 0,
                save: jest.fn()
            };
            getUrlByShortCode.mockResolvedValue(mockUrl);

            const response = await request(app)
                .get('/urls/short123');

            expect(response.status).toBe(302);
            expect(response.headers.location).toBe('http://example.com');
            expect(mockUrl.clicks).toBe(1);
        });

        it('should return 404 if shortUrl does not exist', async () => {
            getUrlByShortCode.mockResolvedValue(null);

            const response = await request(app)
                .get('/urls/invalid');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                error: 'URL not found'
            });
        });

        it('should return 400 if retrieving URL fails', async () => {
            getUrlByShortCode.mockRejectedValue(new Error('Retrieval failed'));

            const response = await request(app)
                .get('/urls/short123');

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                error: 'Retrieval failed'
            });
        });
    });
});