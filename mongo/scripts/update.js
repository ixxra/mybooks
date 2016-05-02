/**
** update.js
**
** reads config.json and scan books folder to extract data.
** prints content to stdout, from there, you can update with `mongoimport`
** or so.
**/
var config = require('./config');
var fs = require('fs');
var path = require('path');


function getKeywords(name){
  return name.toLowerCase().split(/[\W_]+/).filter(function (w){
    return w.length > 3;
  }).sort();
}

function scan(prefix, location, file, stats){
  var extname = path.extname(file);
  var info = {
    name: null,
    ext: null,
    location: location,
    path: path.join(location, file),
    atime: stats.atime,
    mtime: stats.mtime,
    ctime: stats.ctime
  };

  if (extname){
    info.ext = extname.substr(1);
    info.name = file.substr(0, file.length - extname.length);
  } else {
    info.name = file;
  }

  info.keywords = getKeywords(info.name);
  return info;
}


function test(prefix, location, file){
  return function(err, stats){
    if (err) throw err;

    if (stats.isDirectory()){
      fs.readdir(path.join(prefix, location, file), walk(prefix, path.join(location, file)));
    }
    else if (stats.isFile()) console.log(JSON.stringify(scan(prefix, location, file, stats)));

  };
}

function walk(prefix, location){
  return function (err, files){
    if (err) throw err;

    for (var file of files){
      fs.stat(path.join(prefix, location, file), test(prefix, location, file));
    }
  }
}

fs.readdir(config.booksPrefix, walk(config.booksPrefix, '/'));
