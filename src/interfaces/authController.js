const express = require('express');
const {
    register,
    login
} = require('../application/services/auth');
const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const user = await register(req.body.email, req.body.password);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const {
            token
        } = await login(req.body.email, req.body.password);
        res.json({
            token
        });
    } catch (error) {
        res.status(401).json({
            error: error.message
        });
    }
});

module.exports = router;