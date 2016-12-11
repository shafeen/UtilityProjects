var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');

// navbar
router.get('/navbar/:viewname', function(req, res) {
    res.render('partials/navbar/'+req.params.viewname);
});

module.exports = router;
