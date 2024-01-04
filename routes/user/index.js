const express = require('express');
const router = express.Router();
const handler = require('./handler');

const basePath = '/user';

router.post(`${basePath}/login`, (req, res) => {
    handler.login(req, res)
});

module.exports = router;
