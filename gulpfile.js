var gulp = require('gulp');

var ts = require('gulp-typescript');
var insert = require('gulp-insert');
var less = require('gulp-less');
var concat = require('gulp-concat');
var addsrc = require('gulp-add-src');

var path = require('path');
var es = require('event-stream');

var tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript'),
	outFile: 'output.js'
});

gulp.task('compile', function () {
	return gulp.src('scripts/**/*.ts')
		.pipe(ts(tsProject))
		.pipe(insert.append("\nrequirejs(['index']);"))
		.pipe(gulp.dest('output')); //if you want output in root folder: .pipe(gulp.dest(''));
});


gulp.task('less', function () {
	return gulp.src('scripts/**/*.less')
		.pipe(less())
		.pipe(concat('output.css'))
		.pipe(gulp.dest('output'));
});

gulp.task('html', function () {
	return gulp.src('scripts/**/*.html')
		.pipe(addsrc('index.html'))
		.pipe(concat('index.html'))
		.pipe(gulp.dest('output'));
});


gulp.task('default',["compile", "less", "html"], function() {
    gulp.watch('scripts/**/*', ['compile']);
});