'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const pug = require('gulp-pug');
var concatCss = require('gulp-concat-css')

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

gulp.task('concat', function () {
 return gulp.src('frontend/precss/*.css')
   .pipe(concatCss("style.css"))
   .pipe(gulp.dest('./frontend/assets/css'));
});

lazyRequireTask('clean', './tasks/clean', {
  dst: 'public'
});


lazyRequireTask('assets', './tasks/assets', {
  src: 'frontend/assets/**/*.*',
  dst: 'public'
});


gulp.task('build', gulp.series(
    'clean', 'styles','pug','concat', 'assets')
);

gulp.task('watch', function() {
  gulp.watch('frontend/scss/*.scss', gulp.series('styles'));

  gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));

  gulp.watch('frontend/pug/**/*.pug', gulp.series('pug'));
	
  gulp.watch('frontend/precss/*.css', gulp.series('concat'));
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