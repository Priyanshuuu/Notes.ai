const User = require('../../controllers/user');
const BaseRouteHandler = require('../base/handler');

class UserRouteHandler extends BaseRouteHandler {
    constructor() {
        super(UserRouteHandler.name);
    }

    async login(req, res) {
        return this.handleRequest(req, res, User.login.name, User);
    }
}

module.exports = new UserRouteHandler();