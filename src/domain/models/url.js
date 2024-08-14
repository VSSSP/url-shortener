const {
    DataTypes
} = require('sequelize');
const sequelize = require('../../infrastructure/database');
const User = require('./user');

const Url = sequelize.define('Url', {
    originalUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    shortUrl: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    clicks: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    deletedAt: {
        type: DataTypes.DATE,
    },
});

Url.belongsTo(User, {
    foreignKey: 'UserID',
    as: 'User'
});

module.exports = Url;