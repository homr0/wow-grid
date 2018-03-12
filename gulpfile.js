// Gulp dependencies
var gulp = require('gulp');
var argv = require('yargs').argv;
var $ = require("gulp-load-plugins")();
var sequence = require('run-sequence');
var requireDir = require('require-dir');
var browser = require('browser-sync');
var optimizejs = require('gulp-optimize-js');
var del = require('del');

// Task variables
// Check for --production flag and runs as production with 'gulp defualt --production'
var isProduction = !!(argv.production);

// Gulp tasks
// BrowserSync task
gulp.task('browser', function() {
    browser.init({
        server: {
            baseDir: 'dist'
        }
    })
})

// Pipes all scss files into CSS.
gulp.task('sass', function() {
    var minifycss = $.if(isProduction, $.cssnano());

    return gulp.src('src/scss/**/*.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            outputStyle: "nested",
            sourceComments: 'false',
            errLogToConsole: true
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: 'last 2 versions'
        }))
        .pipe($.if(!isProduction, $.sourcemaps.write('./')))
        .pipe(gulp.dest('dist/css'))
        .pipe(browser.reload({
            stream: true
        }))
});

// Pipes JavaScript files.
function onError(err) {
    console.log(err);
    this.emit('end');
}

gulp.task('javascript', function() {
    var optimizeJavascript = $.if(isProduction, optimizejs().on('error', onError));
    var uglify = $.if(isProduction, $.uglify({
        mangle: true,
        compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            if_return: true,
            screw_ie8: true,
            drop_console: true
        }
    })).on('error', onError);

    return gulp.src('src/js/wow.js')
        .pipe($.include({
            extensions: 'js',
            includePaths: [
                __dirname + '/node-modules',
                __dirname + '/src/js'
            ]
        }))
        .on('error', onError)
        .pipe($.sourcemaps.init())
        .pipe(uglify)
        .pipe(optimizeJavascript)
        .pipe($.if(!isProduction, $.sourcemaps.write()))
        .pipe(gulp.dest('dist/js'))
});

// Builds the HTML pages.
gulp.task('pages', function() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'))
});

// Deletes the "dist" directory
gulp.task('clean', function() {
    return del.sync('./dist');
});

// Waches for any changes in Gulp.
gulp.task('watch', ['browser', 'sass'], function() {
    gulp.watch('src/scss/**/*.scss', ['sass', browser.reload]);
    gulp.watch('src/**/*.html', ['pages', browser.reload]);
    gulp.watch('src/js/**/*.js', ['javascript', browser.reload]);
});

// Builds the site.
gulp.task('build', function(done) {
    sequence('clean',['sass', 'javascript', 'pages'], 'docs', done);
});

// Builds the site and watches for file changes.
gulp.task('default', function(done) {
    sequence('build', 'watch', done);
});

// Sets up the GitHub pages.
gulp.task('docs', function() {
    return gulp.src('dist/**/*')
        .pipe(gulp.dest('docs/'))
});

gulp.task('docs:clean', function() {
    return del.sync('./docs');
});
