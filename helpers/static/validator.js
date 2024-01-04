const Joi = require('joi');

const loginRequest = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
});

const loginResponse = Joi.object().keys({
    token: Joi.string().required(),
});

module.exports = {
    login: {
        request: loginRequest,
        response: loginResponse
    }
};