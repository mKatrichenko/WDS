'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');

function lazyRequireTask(taskName, path, options) {
  options = options || {};
  options.taskName = taskName;
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);

    return task(callback);
  });
}

lazyRequireTask('styles', './tasks/styles', {
  src: 'frontend/scss/*.scss'
});

/*
lazyRequireTask('pug', './tasks/pug', {
  src: 'frontend/pug/*.pug'
});
*/

gulp.task('pug', function buildHTML() {
  return gulp.src('frontend/pug/*.pug')
    .pipe(pug({pretty: true
    }))
    .pipe(gulp.dest('frontend/assets'));
});

lazyRequireTask('clean', './tasks/clean', {
  dst: 'public'
});


lazyRequireTask('assets', './tasks/assets', {
  src: 'frontend/assets/**/*.*',
  dst: 'public'
});


gulp.task('build', gulp.series(
    'clean', 'styles','pug', 'assets')
);

gulp.task('watch', function() {
  gulp.watch('frontend/scss/*.scss', gulp.series('styles'));

  gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));

  gulp.watch('frontend/pug/**/*.pug', gulp.series('pug'));
});

lazyRequireTask('serve', './tasks/serve', {
  src: 'public'
});


gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);

lazyRequireTask('lint', './tasks/lint', {
  cacheFilePath: process.cwd() + '/tmp/lintCache.json',
  src: 'frontend/**/*.js'
});