'use strict';

// REQUIRE
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const uglifycss = require('gulp-uglifycss');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify-es').default;

//GENERATE
function generateSASS() {
    return src('src/assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError)) //compile
        .pipe(uglifycss({ "uglyComments": true })) //uglify
        .pipe(rename({ suffix: '.min' })) //[...].min.css
        .pipe(dest('dist/css'));//pipe
}

function generateCSS() {
    return src('src/assets/css/**/*')
        .pipe(uglifycss({ "uglyComments": true }))
        .pipe(rename({ suffix: '.min' })) //[...].min.css
        .pipe(dest('dist/css'));
}

function generateHTML() {
    return src('src/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist'));
}

function generateIMG() {
    return src('src/assets/img/**/*')
        .pipe(dest('dist/img'));
}

function generateJS() {
    return src('src/assets/js/**/*')
        .pipe(uglify()) //uglify
        .pipe(dest('dist/js'));
}

// WATCH
function watchFiles() {
    watch('src/assets/scss/**/*', generateSASS);
    watch('src/index.html', generateHTML);
    watch('src/assets/js/**/*', generateJS);
    watch('src/assets/img/**/*', generateIMG);
    watch('src/assets/css/**/*', generateCSS);
}

//DEFAULT
exports.default = series(
    parallel(generateSASS, generateHTML, generateIMG, generateCSS, generateJS), //build all
    watchFiles
);