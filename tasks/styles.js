'use strict';


const gulp = require('gulp');
const combine = require('stream-combiner2').obj;
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');



//const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';



module.exports = function(options) {
	return function() {  
		return combine(
      gulp.src(options.src, {since: gulp.lastRun(options.taskName)}),
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }),
      //sourcemaps.init(),                     
      sass(),                     
      //sourcemaps.write('./maps'),  	       
		gulp.dest('frontend/precss')
    ).
		on('error', notify.onError());
  };
};

