var express = require('express');
var router = express.Router();
var uuid = require('uuid/v4');

const VIEW_PARTIALS_FOLDER = 'partials';

// loading module partial views
router.get('/:modulename/:viewname', function(req, res) {
    res.render(VIEW_PARTIALS_FOLDER+'/'+req.params.modulename+'/'+req.params.viewname);
});

module.exports = router;
