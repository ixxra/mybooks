var uglify = require('gulp-uglify');
var less = require('gulp-less');
var gulp = require('gulp');
var path  = require('path');
var app = require('./app');
var startServer = require('./lib/server');
var server = null;

gulp.task('startServer', function () {
  if (server){
    console.log('Restarting express');
    server.close(function (err){
      if (err){
        console.log('Error:', err);
      }
      server = startServer(app());
    });
  } else {
    console.log('Starting new server');
    server = startServer(app());
  }
});

gulp.task('buildStylesheets', function () {
  var builder = require('./lib/stylesheetBuilder');
  builder();
});

gulp.task('less', function () {
  return gulp.src('./src/css/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'node_modules', 'bootstrap-less', 'bootstrap')]
    }))
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('search.js', function (){
  return gulp.src('./src/js/search.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/javascripts'));
});

gulp.task('watch', function(){
    //gulp.watch(['app.js', 'src/js/*', 'routes/**'], ['restart']);
    gulp.watch(['src/css/*'], ['less']);
    gulp.watch(['src/js/search.js'], ['search.js']);
    gulp.watch(['routes/*.js', 'models/*.js'], ['startServer']);
});

gulp.task('default', ['less', 'buildStylesheets', 'startServer', 'watch']);
