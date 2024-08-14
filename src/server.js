const express = require('express');
const cors = require('cors');
const {
    json
} = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const authRoutes = require('./interfaces/authController');
const urlRoutes = require('./interfaces/urlController');
const sequelize = require('./infrastructure/database');
require('dotenv').config();

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, 'docs', 'swagger.yaml'));

app.use(cors());
app.use(json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRoutes);
app.use('/', urlRoutes);

const startServer = async () => {
    await sequelize.sync();
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

if (require.main === module) {
    startServer();
}

module.exports = app;