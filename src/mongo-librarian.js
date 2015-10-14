var books = db.books.find({$and: [{keywords: 'geometry'}, {keywords: 'analysis'}]});
books.forEach(function(book){
  printjson(book);
});
