var path = require('path');
var ps = require('child_process');
var fs = require('fs');
var os = require('os');

const BOOKS = os.homedir() + '/Libros';
const THUMBS = 'data/thumbs';


function walk(dir, cb){
  fs.readdir(dir, function(err, files){
    if (err) throw err;

    files.forEach(function (f) {
      var absPath = path.join(dir, f);
      fs.lstat(absPath, function (err, stats) {
        if (err) throw err;

        if (stats.isDirectory()) {
          walk(absPath, cb);
        } else if (stats.isFile() && !stats.isSymbolicLink()) {
          cb(absPath);
        }
      });
    });
  });
}

function md5sum(file, cb){
  var sum = ps.spawn('md5sum', [file]);
  var cache = [];

  sum.stdout.on('data', function (data){
    cache.push(data);
  });

  sum.stdout.on('end', function () {
    var out = cache.join('').trim();
    var idx = out.indexOf(' ');
    var md5sum = out.slice(0,idx);
    var location = out.slice(idx+1).trim();
    cb({
      md5sum: md5sum,
      location: location
    });
  });
}

function thumb(file) {
  md5sum(file, function(sum){
    var dest = path.join(THUMBS, sum.md5sum + '.png');
    fs.access(dest, fs.F_OK, function (err) {
      if (err) {
        var thumbnailer = ps.spawn('evince-thumbnailer', [file, dest]);
        thumbnailer.on('exit', function (code) {
          if (code === 0){
            console.log(JSON.stringify(sum));
          }
        });
        thumbnailer.on('error', function (err) {
          console.log('ERROR!', sum);
          throw err;
        });
      } else {
        console.log(JSON.stringify(sum));
      }
    });
  });
}

walk(BOOKS, function(book){
    thumb(book);
});
