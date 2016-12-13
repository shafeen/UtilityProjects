var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');

const VIEW_PARTIALS_PATH = 'partials/';
const NG_CLIENT_RELATIVE_PATH = '../ng-client/';

// loading module partial views -- anything more specific should come before
router.get('/:modulename/:partialname', function(req, res) {
    if (req.isAuthenticated()) {
        res.render(NG_CLIENT_RELATIVE_PATH + req.params.modulename + '/' + req.params.partialname, {user: req.user});
    } else {
        res.render(NG_CLIENT_RELATIVE_PATH + req.params.modulename + '/' + req.params.partialname);
    }
});

module.exports = router;
