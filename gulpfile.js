'use strict';
var gulp = require('gulp');
var mocha = require('gulp-mocha');
var ts = require('gulp-typescript');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var tsProject = ts.createProject('tsconfig.json');
var spawn = require('child_process').spawn;
var bump = require('gulp-bump');

var fs = require('fs');
var prompt = require('gulp-prompt');
var git = require('gulp-git');

var filter = require('gulp-filter');
var tag_version = require('gulp-tag-version');









gulp.task('push', ['bump'], function () {
    return gulp.src('.').pipe(git.push());
});

gulp.task('add', function () {
    return gulp.src('.').pipe(git.add({args: '-A'}));
});


gulp.task('commit', ['add'], function () {
    return gulp.src('.').pipe(prompt.prompt({
        type: 'input',
        name: 'commit',
        message: 'enter a commit msg, eg initial commit'
    }, function (res) {
        return gulp.src('.').pipe(git.commit(res.commit));
    }));
});

gulp.task('bump', ['commit'], function () {
    return gulp.src('./package.json').pipe(bump({
        type: 'patch'
    })).pipe(gulp.dest('.'));
});


gulp.task('test', function () {
    return gulp.src('test/**/*.js', { read: false })
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('build', function () {
    var tsResult = tsProject.src() // instead of gulp.src(...)
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated 

        .pipe(ts(tsProject, {
            sortOutput: true,
					   }));

    return tsResult
        .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file 
        .pipe(gulp.dest('.'));
});