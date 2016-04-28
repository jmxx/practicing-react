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
    .pipe(source('app.js'))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('serve', () => {
  browserSync.init({
    server: './dist'
  });
});

gulp.task('watch:stylus', () => {
  gulp.watch('./src/styl/**/*.styl', gulp.series('stylus'));
});

gulp.task('watch:html', () => {
  gulp.watch('./src/**/*.html', gulp.series('html', browserSync.reload));
});

gulp.task('watch:es6', () => {
  gulp.watch('./src/js/**/*.jsx', gulp.series('es6:react', browserSync.reload));
});

gulp.task('watch', gulp.parallel('serve', 'watch:html', 'watch:es6', 'watch:stylus'));

gulp.task('default', gulp.series('html', 'stylus', 'es6:react', 'watch'));