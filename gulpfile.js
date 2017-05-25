var gulp = require('gulp');
var util = require('gulp-util');

var ts = require('gulp-typescript');
var insert = require('gulp-insert');
var less = require('gulp-less');
var concat = require('gulp-concat');
var addSrc = require('gulp-add-src');
var replace = require('gulp-string-replace');

var path = require('path');

var isProd = util.env.production;

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

	var jsToLoadAfterRequire = 'data-main="output.js"';

	if (isProd) {
		jsToLoadAfterRequire = '';
	}

	return gulp.src('scripts/**/*.html')
		.pipe(addSrc('_index.html'))
		.pipe(replace('{:require-data-source}', jsToLoadAfterRequire))
		.pipe(concat('index.html'))
		.pipe(gulp.dest('output'));
});


gulp.task('default',["compile", "less", "html"], function() {
    if (!isProd) {
    	gulp.watch('scripts/**/*', ['compile']);
	}
});