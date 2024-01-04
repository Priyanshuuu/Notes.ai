const mongoose = require('mongoose');
const passport = require('passport');
const JWT = require('../../middlewares/jwtHandler');
// const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../../models/user');

// Passport local strategy



async function login(params) {
    try {

        const {username, password} = params;

        const user = await User.findOne({"username": username});
        if (!user) throw new Error('Failed');
    
        let checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            const error = new Error();
            error.message = 'Authentication failed';
            error.code = 401;
            throw error;
        }

        const getToken = await JWT.getJwtToken({ user });
        return {token: getToken};

    } catch (error) {
        console.log(`Failed at login with error: ${JSON.stringify(error)}`);
        throw error;
    }
}

module.exports = {
    login
}