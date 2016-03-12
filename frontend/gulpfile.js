var gulp = require('gulp'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    gls = require('gulp-live-server'),
    templateCache = require('gulp-angular-templatecache');

var paths = {
  views: ['./app/**/*.html', '!./app/index.html']
};

gulp.task('templates', function () {
  return gulp.src(paths.views)
      .pipe(templateCache())
      .pipe(gulp.dest('./app/src/'));
});


gulp.task('dist', ['templates'], function () {
  return gulp.src('app/index.html')
      .pipe(useref())
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', cssnano()))
      .pipe(gulp.dest('dist/'));
});


gulp.task('serve:dist', function () {
  var server = gls.static('dist/', 8000);
  server.start();
});
