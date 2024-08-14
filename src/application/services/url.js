const crypto = require('crypto');
const Url = require('../../domain/models/url');
const validator = require('validator');

const generateShortUrl = () => {
    return crypto.randomBytes(3).toString('base64url');
};

const shortenUrl = async (originalUrl, userId = null) => {
    if (!validator.isURL(originalUrl)) {
        throw new Error('Invalid URL');
    }
    const shortUrl = generateShortUrl();
    const url = await Url.create({
        originalUrl,
        shortUrl,
        UserId: userId
    });
    return url.shortUrl;
};

const getUrlByShortCode = async (shortUrl) => {
    return await Url.findOne({
        where: {
            shortUrl
        }
    });
};

const listUrls = async (userId) => {
    return await Url.findAll({
        where: {
            UserId: userId
        },
        attributes: ['id', 'originalUrl', 'shortUrl', 'clicks']
    });
};

module.exports = {
    shortenUrl,
    getUrlByShortCode,
    listUrls
};