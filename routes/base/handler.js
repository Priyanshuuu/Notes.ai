class BaseRouteHandler {
    constructor(name) {
        this.handlerName = name;
    }

    async handleRequest(req, res, methodName, methods) {
        console.log(`${this.handlerName}-${methodName} - `, JSON.stringify({ params: req.params, query: req.query, body: req.body }));
        try {
            const response = await methods[methodName](req);
            res.send(response);
        } catch (err) {
            console.log(`Error in handling ${methodName} - `, err);
            res.status(err.code || 500).send({
                error: {
                    code: err.code || 500,
                    message: err.message,
                },
            });
        }
    }
}
module.exports = BaseRouteHandler;