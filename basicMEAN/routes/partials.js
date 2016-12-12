var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');

const VIEW_PARTIALS_PATH = 'partials/';
const NG_CLIENT_RELATIVE_PATH = '../ng-client/';

// loading module partial views
router.get('/:modulename/:partialname', function(req, res) {
    res.render(NG_CLIENT_RELATIVE_PATH + req.params.modulename + '/' + req.params.partialname);
});

module.exports = router;
