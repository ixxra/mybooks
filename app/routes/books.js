var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Book = require('../models/book');
var ps = require('child_process');

function view(book){
  ps.spawn('evince', [book.location]);
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  Book.count({}, function(err, total){
    if (err) throw err;
    res.render('books',{title: 'Books Catalog', total: total});
  });
});

router.get('/:id', function(req, res, next) {
  Book.findOne({_id: req.params.id}, function(err, book){
    if (err) throw err;
    if (req.query.action === 'open'){
      view(book);
    }
    res.send(book);
  });
});

module.exports = router;
