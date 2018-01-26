// Gulp dependencies
var gulp = require("gulp");
var argv = require('yargs').argv;
var $ = require("gulp-load-plugins")();
var sequence = require('run-sequence');
var requireDir = require('require-dir');
var browser = require('browser-sync');

// Gulp variables

// Gulp tasks
gulp.task('sass', function() {
    return gulp.src('src/scss/*')
        .pipe($.sass())
        .pipe(gulp.dest('dist/css'))
});
