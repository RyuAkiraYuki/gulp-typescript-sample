var gulp = require('gulp');
var ts = require('gulp-typescript');
var insert = require('gulp-insert');

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


gulp.task('default',["compile"], function() {
    gulp.watch('scripts/**/*.ts', ['compile']);
});