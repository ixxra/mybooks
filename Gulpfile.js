var uglify = require('gulp-uglify');
var less = require('gulp-less');
var gulp = require('gulp');
var path  = require('path');
var ps = require('child_process');


function startServer() {
  ps.exec('npm start');
}

gulp.task('restart', function(){
  startServer();
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
});

gulp.task('default', ['less', 'watch']);
