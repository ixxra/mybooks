var fs = require('fs');
var path = require('path');

function parseFile(f){
    var fname = path.basename(f);
    return {
      fname: f,
      keywords: 
        fname.split(/[^A-Za-z0-9]/).filter(function (word) {
          return word.length > 0;
        })
      
    };
}


function parse(err, files){
  if (err) throw err;

  for (var f of files){
    console.log({
      fname: f,
      keywords: 
        f.split(/[^A-Za-z0-9]/).filter(function (word) {
          return word.length > 0;
        })
      
    });
  }
}

for (var i=2; i<process.argv.length; i++){
  console.log(JSON.stringify(parseFile(process.argv[i])));
}
//fs.readdir(booksLoc, parse)
