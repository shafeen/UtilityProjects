var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');

router.get('/:viewname', function(req, res) {
    res.render(req.params.viewname);
});

module.exports = router;
