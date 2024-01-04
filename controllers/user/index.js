const validator = require('../../helpers/static/validator');
const methods = require('./method');
const BaseController = require('../base/handler');

class UserController extends BaseController {
    constructor() {
        super(UserController.name);
    }

    async login(req) {
        return await this.handleRequest(
            req,
            methods.login.name,
            methods,
            validator.login.request,
            validator.login.response,
        );
    }
}

module.exports = new UserController();