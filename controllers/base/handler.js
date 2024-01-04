const constants = require("./../../helpers/static/constant");

class BaseController {
    constructor(name) {
        this.controllerName = name;
    }

    async handleRequest(req, methodName, methods, requestSchema, responseSchema) {
        let response = {};
        const params = {
            ...req.params,
            ...req.query,
            ...req.body,
        };

        const headers = { ...req.headers }
        if (!params.userId && headers[constants.reqHeaders.USERID]) params.userId = headers[constants.reqHeaders.USERID];
        const reqSchema = requestSchema.validate(params);
        if (reqSchema.error) {
            reqSchema.error.message = reqSchema.error
                && reqSchema.error.details
                && reqSchema.error.details[0].message;
            reqSchema.error.code = 400;
            throw reqSchema.error;
        }

        try {
            response = await methods[methodName](params);
        } catch (methodError) {
            console.log(`Error in ${this.controllerName}-${methodName}`, methodError);
            if (methodError.code === 400 || methodError.code === 404 || methodError.code === 500 || methodError.code === 405) throw methodError;
            const err = new Error(`Failed to process request with error: ${methodError}`);
            err.code = methodError.code ? methodError.code : 500;
            throw err;
        }

        const respSchema = responseSchema.validate(response);
        if (respSchema.error) {
            respSchema.error.message = respSchema.error
                && respSchema.error.details
                && respSchema.error.details[0].message;
            respSchema.error.code = 400;
            throw respSchema.error;
        }

        return response;
    }
}

module.exports = BaseController;