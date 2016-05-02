var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  var thumb = req.params.id;
  res.sendFile('../data/thumbs/' + thumb);
});

module.exports = router;
