const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../../domain/models/user');
const validator = require('validator');

const register = async (email, password) => {
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email format');
    }

    const existingUser = await User.findOne({
        where: {
            email
        }
    });
    if (existingUser) {
        throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        password: hashedPassword
    });

    return user;
};

const login = async (email, password) => {
    if (!validator.isEmail(email)) {
        throw new Error('Invalid email format');
    }

    const user = await User.findOne({
        where: {
            email
        }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({
        id: user.id
    }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    return {
        token
    };
};

module.exports = {
    register,
    login
};