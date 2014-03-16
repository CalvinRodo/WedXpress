'use strict';
var gulp = require('gulp');
var bower = require('gulp-bower');
var clean = require('gulp-clean');
var less = require('gulp-less');

gulp.task('default', ['clean', 'bower', 'less'], function(){
});

gulp.task('clean', function(){
	gulp.src(['public/styles/*', 'public/scripts/libs/*'])
		.pipe(clean());
});

gulp.task('bower', function(){
	bower().pipe(gulp.dest('public/scripts/libs'));
});

gulp.task('less', function(){
	gulp.src('src/styles/*.less')
	  .pipe(less())
	  .pipe(gulp.dest('public/styles/'));
});

