const express = require('express');
const router = express.Router();

// protected /api routes
// ---------------------
module.exports = function (settings) {

    router.get('/test', (req, res) => {
        res.json({
            message: 'responded via test protected api endpoint'
        })
    });

    return router;
};
