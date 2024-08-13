const express = require('express');
const {
    shortenUrl,
    getUrlByShortCode,
    updateUrl,
    deleteUrl,
    listUrls
} = require('../application/services/url');
const router = express.Router();

router.post('/shorten', async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
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

router.get('/urls', async (req, res) => {
    try {
        const urls = await listUrls(req.user.id);
        res.json(urls);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

router.put('/urls/:id', async (req, res) => {
    try {
        const url = await updateUrl(req.params.id, req.body.newUrl, req.user.id);
        res.json(url);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

router.delete('/urls/:id', async (req, res) => {
    try {
        const url = await deleteUrl(req.params.id, req.user.id);
        res.json(url);
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