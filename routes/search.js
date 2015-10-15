var express = require('express');
var router = express.Router();
var Book = require('../models/book');

function makeQuery(q) {
  var tokens = q.trim().split(/[^a-zA-Z0-9]/).filter(function nonEmpty(word){
    return word.length > 0;
  });

  return tokens.map(function query(token){
    return {keywords: token};
  });
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  Book.find({$and: makeQuery(req.query.q)}, function(err, docs){
    if (err) throw err;
    res.render('search',{
      title: 'Search Results for ' + req.query.q,
      query: req.query.q,
      total: docs.length,
      books: docs
    });
  });
});

module.exports = router;
