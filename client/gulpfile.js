var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');
var angularFilesort = require('gulp-angular-filesort');

gulp.task('serve', ['sass', 'inject'], function() {
  browserSync.init({
    server: "./app"
  });

  gulp.watch("./app/scss/*.scss", ['sass']);
  gulp.watch("./app/js/*.js").on('change', browserSync.reload);
  gulp.watch("./app/*.html").on('change', browserSync.reload);
});

gulp.task('sass', function() {
  return gulp.src("./app/scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./app/css"))
    .pipe(browserSync.stream());
});

gulp.task('bower-files', function() {
  return gulp.src(bowerFiles())
    .pipe(gulp.dest('./app/bower_components'));
});

gulp.task('inject', ['bower-files'], function () {
  var target = gulp.src('./app/index.html');
  var sources = gulp.src(['./app/js/*.js', './app/css/*.css'], {read: false});

  return target
    .pipe(inject(gulp.src('./app/bower_components/*.js').pipe(angularFilesort()), {relative: true, name: 'bower'}))
    .pipe(inject(gulp.src('./app/bower_components/*.css'), {relative: true, name: 'bower'}))
    .pipe(inject(sources, {relative: true}))
    .pipe(gulp.dest('./app'));
});

gulp.task('default', ['serve']);