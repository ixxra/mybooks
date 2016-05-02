var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  location: String,
  md5sum: String,
  name: String,
  keywords: [String]
});

BookSchema.virtual('thumbnail').get(function () {
  return '/thumbnails/' + this.md5sum + '.png';
});

BookSchema.virtual('url').get(function () {
  return '/books/' + this.id;
});

BookSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Book', BookSchema);
