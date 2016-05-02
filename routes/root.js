var express = require('express');
var router = express.Router();
var Book = require('../models/book');

router.get('/', function(req, res, next) {
  var latestBooks = Book.find(null, null, {sort: {mtime: 1}, limit: 10}, function(err, docs){
    if (err){
      next(err);
    } else {
      res.render('index', { title: 'Library', books: docs });
    }
  });
});

module.exports = router;
