var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  location: String,
  name: String,
  keywords: [String]
});

module.exports = mongoose.model('Book', BookSchema);
