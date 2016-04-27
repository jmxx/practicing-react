var gulp = require('gulp')
  , browserSync = require('browser-sync').create()
  , browserify = require('browserify')
  , babelify = require('babelify')
  , source = require('vinyl-source-stream')
  , stylus = require('gulp-stylus')
  , postStylus = require('poststylus')
  , sourcemaps = require('gulp-sourcemaps')
  , lost = require('lost')
  , autoprefixer = require('autoprefixer');

gulp.task('html', function() {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('stylus', function () {
  return gulp.src('./src/styl/app.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [
        postStylus([lost, autoprefixer])
      ]
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('es6:react', function () {
  return browserify({
    entries: './src/js/index.jsx',
    extensions: ['.jsx'],
    debug: true
  })
    .transform(babelify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('serve', function () {
  browserSync.init({
    server: './dist'
  });
});

gulp.task('watch:stylus', function () {
  gulp.watch('./src/styl/**/*.styl', gulp.series('stylus'));
});

gulp.task('watch:html', function () {
  gulp.watch('./src/**/*.html', gulp.series('html', browserSync.reload));
});

gulp.task('watch:es6', function () {
  gulp.watch('./src/js/**/*.jsx', gulp.series('es6:react', browserSync.reload));
});

gulp.task('watch', gulp.parallel('serve', 'watch:html', 'watch:es6', 'watch:stylus'));

gulp.task('default', gulp.series('html', 'stylus', 'es6:react', 'watch'));