'use strict';

import gulp         from 'gulp';
import browserify   from 'browserify';
import browserSync  from 'browser-sync';
import babelify     from 'babelify';
import source       from 'vinyl-source-stream';
import stylus       from 'gulp-stylus';
import postStylus   from 'poststylus';
import sourcemaps   from 'gulp-sourcemaps';
import lost         from 'lost';
import autoprefixer from 'autoprefixer';

const onError = function (err) {
  console.log(err.stack);
  this.emit('end');
};

gulp.task('html', () => {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('stylus', () => {
  return gulp.src('./src/styl/app.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [
        postStylus([lost, autoprefixer])
      ]
    }))
    .on('error', onError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('es6:react', () => {
  return browserify({
    entries: './src/js/index.jsx',
    extensions: ['.jsx'],
    debug: true
  })
    .transform(babelify)
    .bundle()
    .on('error', onError)
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('serve', (done) => {
  browserSync.init({
    server: './dist'
  }, done);
});

gulp.task('watch:stylus', () => {
  return gulp.watch('./src/styl/**/*.styl', gulp.series('stylus'));
});

gulp.task('watch:html', () => {
  return gulp.watch('./src/**/*.html', gulp.series('html', function reload(done) {
    browserSync.reload();
    done();
  }));
});

gulp.task('watch:es6', () => {
  return gulp.watch('./src/js/**/*.jsx', gulp.series('es6:react', function reload(done) {
    browserSync.reload();
    done();
  }));
});

gulp.task('watch', gulp.parallel('watch:html', 'watch:es6', 'watch:stylus'));

gulp.task('default', gulp.series('html', 'stylus', 'es6:react', 'serve', 'watch'));