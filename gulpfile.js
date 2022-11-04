'use strict';

// REQUIRE
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const uglifycss = require('gulp-uglifycss');
const uglify = require('gulp-uglify-es').default;
var concat = require('gulp-concat');

//GENERATE
function generateSASS() {
    return src('assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError)) //compile
        .pipe(uglifycss({ "uglyComments": true })) //uglify
        .pipe(rename({ suffix: '.min' })) //[...].min.css
        .pipe(dest('assets/css'));//pipe
}

function generateJS() {
    return src(['assets/js/xhr.js', 'assets/js/MailImg.js', 'assets/js/app.js', 'assets/js/newImg.js'])
        .pipe(concat('all.min.js'))
        .pipe(dest('assets/js'));
}

/** Uglify all.js */
function uglifyJS() {
    return src('assets/js/all.min.js')
        .pipe(uglify()) //uglify
        .pipe(dest('assets/js'));
}

// WATCH
function watchFiles() {
    watch('assets/scss/**/*', generateSASS);
    watch(['assets/js/**/*', '!assets/js/**/*.min.js'], series(generateJS, uglifyJS));
}

//DEFAULT
exports.default = series(
    parallel(generateSASS, series(generateJS, uglifyJS)), //build all
    watchFiles
);