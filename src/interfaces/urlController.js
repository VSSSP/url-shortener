const express = require('express');
const {
    shortenUrl,
    getUrlByShortCode,
    listUrls
} = require('../application/services/url');
const router = express.Router();
const authenticateJWT = require('../middleware/authJWT');

router.post('/shorten', authenticateJWT, async (req, res) => {
    try {
        const userId = req.user.id;
        const shortUrl = await shortenUrl(req.body.originalUrl, userId);
        res.json({
            shortUrl: `${req.protocol}://${req.get('host')}/${shortUrl}`
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

router.get('/urls', authenticateJWT, async (req, res) => {
    try {
        const urls = await listUrls(req.user.id);
        res.json(urls);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

router.get('/:shortUrl', async (req, res) => {
    try {
        const url = await getUrlByShortCode(req.params.shortUrl);
        if (!url) return res.status(404).json({
            error: 'URL not found'
        });

        url.clicks += 1;
        await url.save();

        res.redirect(url.originalUrl);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

module.exports = router;