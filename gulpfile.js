'use strict';
var gulp = require('gulp');
var bower = require('gulp-bower');
var clean = require('gulp-clean');
var less = require('gulp-less');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var jade = require('gulp-jade');

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname;
var LIVERELOAD_PORT = 35729;

function startExpress() {
 
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')());
  app.use(express.static(EXPRESS_ROOT));
  app.listen(EXPRESS_PORT);
  gutil.log(EXPRESS_ROOT + ' served up on ' + EXPRESS_PORT);
}

var lr; 
function startLivereload() {
 
  lr = require('tiny-lr')();
  lr.listen(LIVERELOAD_PORT);
}

gulp.task('default', ['clean', 'bower', 'less', 'watch'], function(){
});

gulp.task('jade', function(){
	gulp.src('views/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('jadeout'));
});

gulp.task('server', function(){
	startExpress();
	startLivereload();
});

gulp.task('clean', function(){
	gulp.src(['public/styles/*', 'public/scripts/libs/*'], { read: false })
		.pipe(clean());
});

gulp.task('bower', function(){
	bower().pipe(gulp.dest('public/scripts/libs'));
});

gulp.task('less', function(){
	gulp.src('src/styles/*.less')
	  .pipe(less())
	  .pipe(gulp.dest('public/styles/'))
	  .pipe(livereload());
});

gulp.task('watch', ['server'], function(){
	gulp.watch('src/styles/*.less',['less']);
});

