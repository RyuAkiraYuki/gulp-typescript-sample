var gulp = require('gulp');
var util = require('gulp-util');

var ts = require('gulp-typescript');
var insert = require('gulp-insert');
var less = require('gulp-less');
var concat = require('gulp-concat');
var addSrc = require('gulp-add-src');
var replace = require('gulp-string-replace');
var inject = require('gulp-inject');

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

gulp.task('html', ['less'], function () {

	var scriptSrc = '<script type="text/javascript" src="output.js"></script>'
	var bundledCssSrc = gulp.src('output/output.css');
	var viewTemplatesSrc = gulp.src('scripts/**/*.html');

	if (isProd) {
		scriptSrc = '';
	}

	var htmlCreationStream = gulp.src('_index.html')
		.pipe(replace('{:js-reference-for-dev}', scriptSrc))
		.pipe(inject(bundledCssSrc, {
			starttag: '/* inject:css */',
			endtag: '/* endinject */',
			transform: (filePath, file) => {
				return file.contents.toString('utf8');
			}
		}))
		.pipe(inject(viewTemplatesSrc, {
			transform: (filePath, file) => {
				return file.contents.toString('utf8');
			}
		}))
		.pipe(concat('index.html'))

		// Maybe need to remove html and body, need to check if SN can handle them
		if (isProd) {

		}

		return htmlCreationStream.pipe(gulp.dest('output'));
});


gulp.task('default',["compile", "less", "html"], function() {
    if (!isProd) {
		gulp.watch('scripts/**/*.ts', ['compile']);
		gulp.watch('scripts/**/*.less', ['less', 'html']);
		gulp.watch('_index.html', ['html']);
		gulp.watch('gulpfile.js', ['default']);
	}
});