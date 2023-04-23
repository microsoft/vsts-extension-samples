var gulp = require('gulp');
var path = require('path');
var del = require('del'); 
var shell = require('shelljs')
var pkgm = require('./package');
var gutil = require('gulp-util');
var minimist = require('minimist');
var fs = require('fs');
var tsc = require('gulp-tsc');
var mocha = require('gulp-mocha');

var mopts = {
  boolean: 'ci',
  string: 'suite',
  default: { ci: false, suite: '**' }
};

var options = minimist(process.argv.slice(2), mopts);


var _build = path.join(__dirname, '_build');
var _buildRoot = path.join(_build, 'Extension');
var _pkgRoot = path.join(__dirname, '_package');

gulp.task('clean', function (cb) {
	del([_build, _pkgRoot],cb);
});

// compile tasks inline
gulp.task('compileTasks', function (cb) {
	var tasksPath = path.join(__dirname, 'Extension', '**/*.ts');
	return gulp.src([tasksPath, 'definitions/*.d.ts'])
		.pipe(tsc())
		.pipe(gulp.dest(path.join(__dirname, 'Extension')));
});

gulp.task('compile', ['compileTasks']);

gulp.task('build', ['clean', 'compile'], function () {
	shell.mkdir('-p', _buildRoot);
	return gulp.src(path.join(__dirname, 'Extension', '**/task.json'))
        .pipe(pkgm.PackageTask(_buildRoot));
});

gulp.task('package', ['build'], function() {
    var manifestDir = path.join(__dirname, 'Extension');
    return pkgm.PackageVsix(_pkgRoot, manifestDir);
});

gulp.task('default', ['package']);
