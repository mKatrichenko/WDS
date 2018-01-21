'use strict';


const gulp = require('gulp');
const pug = require('gulp-pug');

module.exports = function(options) {
	
	return function buildHTML() {
		return gulp.src(options.src),                  
      	pug({pretty: true}),                      	       
		gulp.dest('frontend/assets')
  };
};



/*
	return gulp.src(options.src,                  
      	pug(),                      	       
		gulp.dest('frontend/assets')
    ).*/