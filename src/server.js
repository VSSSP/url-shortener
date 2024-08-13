const express = require('express');
const cors = require('cors');
const {
    json
} = require('body-parser');
const authRoutes = require('./interfaces/authController');
const urlRoutes = require('./interfaces/urlController');
const sequelize = require('./infrastructure/database');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(json());

app.use('/auth', authRoutes);
app.use('/', urlRoutes);

sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
});