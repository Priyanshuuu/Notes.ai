const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
    res.send({
        status: 'success',
    });
});

router.get('/ping', (req, res) => {
    res.send({
        status: 'success',
    });
});

module.exports = router;