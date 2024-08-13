const crypto = require('crypto');
const Url = require('../../domain/models/url');

const generateShortUrl = () => {
    return crypto.randomBytes(3).toString('base64url');
};

const shortenUrl = async (originalUrl, userId = null) => {
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

const updateUrl = async (id, newUrl, userId) => {
    const url = await Url.findOne({
        where: {
            id,
            UserId: userId
        }
    });
    if (!url) throw new Error('URL not found');
    url.originalUrl = newUrl;
    await url.save();
    return url;
};

const deleteUrl = async (id, userId) => {
    const url = await Url.findOne({
        where: {
            id,
            UserId: userId
        }
    });
    if (!url) throw new Error('URL not found');
    await url.destroy();
    return url;
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
    updateUrl,
    deleteUrl,
    listUrls
};