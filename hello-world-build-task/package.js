var through = require('through2');
var gutil = require('gulp-util');
var path = require('path');
var fs = require('fs');
var check = require('validator');
var shell = require('shelljs');
var Q = require('q');
var os = require('os');
var exec = require('child_process').exec;

var _strRelPath = path.join('Strings', 'resources.resjson', 'en-US');

var _divider = '// *******************************************************' + os.EOL;
var _banner = '' + _divider;
_banner += '// GENERATED FILE - DO NOT EDIT DIRECTLY' + os.EOL;
_banner += _divider;

var createError = function(msg) {
	return new gutil.PluginError('PackageTask', msg);
}

var validate = function(folderName, task) {
	var defer = Q.defer();

	var vn = (task.name  || folderName);

	if (!task.id || !check.isUUID(task.id)) {
		defer.reject(createError(vn + ': id is a required guid'));
	};

	if (!task.name || !check.isAlphanumeric(task.name)) {
		defer.reject(createError(vn + ': name is a required alphanumeric string'));
	}

	if (!task.friendlyName || !check.isLength(task.friendlyName, 1, 40)) {
		defer.reject(createError(vn + ': friendlyName is a required string <= 40 chars'));
	}

	if (!task.instanceNameFormat) {
		defer.reject(createError(vn + ': instanceNameFormat is required'));	
	}

	// resolve if not already rejected
	defer.resolve();
	return defer.promise;
};

var LOC_FRIENDLYNAME = 'loc.friendlyName';
var LOC_HELPMARKDOWN = 'loc.helpMarkDown';
var LOC_DESCRIPTION = 'loc.description';
var LOC_INSTFORMAT = 'loc.instanceNameFormat';
var LOC_GROUPDISPLAYNAME = 'loc.group.displayName.';
var LOC_INPUTLABEL = 'loc.input.label.';
var LOC_INPUTHELP = 'loc.input.help.';

var createStrings = function(task, pkgPath, srcPath) {
	var defer = Q.defer();

	var strPath = path.join(pkgPath, _strRelPath);
	shell.mkdir('-p', strPath);
	var srcStrPath = path.join(srcPath, _strRelPath);
	shell.mkdir('-p', srcStrPath);

	//
	// Loc tasks.json and product strings content
	//
	var strings = {};
	strings[LOC_FRIENDLYNAME] = task.friendlyName;
	task['friendlyName'] = 'ms-resource:' + LOC_FRIENDLYNAME;
	
	strings[LOC_HELPMARKDOWN] = task.helpMarkDown;
	task['helpMarkDown'] = 'ms-resource:' + LOC_HELPMARKDOWN;

	strings[LOC_DESCRIPTION] = task.description;
	task['description'] = 'ms-resource:' + LOC_DESCRIPTION;

	strings[LOC_INSTFORMAT] = task.instanceNameFormat;
	task['instanceNameFormat'] = 'ms-resource:' + LOC_INSTFORMAT;

	if (task.groups) {
		task.groups.forEach(function(group) {
			if (group.name) {
				var key = LOC_GROUPDISPLAYNAME + group.name;
				strings[key] = group.displayName;
				group.displayName = 'ms-resource:' + key;
			}
		});
	}

	if (task.inputs) {
		task.inputs.forEach(function(input) {
			if (input.name) {
				var labelKey = LOC_INPUTLABEL + input.name;
				strings[labelKey] = input.label;
				input.label = 'ms-resource:' + labelKey; 

				if (input.helpMarkDown) {
					var helpKey = LOC_INPUTHELP + input.name;
					strings[helpKey] = input.helpMarkDown;
					input.helpMarkDown = 'ms-resource:' + helpKey;				
				}				
			}
		});
	}	

	//
	// Write the tasks.json and strings file in package and back to source
	//
	var enPath = path.join(strPath, 'resources.resjson');
	var enSrcPath = path.join(srcStrPath, 'resources.resjson');

	var enContents = '' + _banner;
	enContents += JSON.stringify(strings, null, 2);
	fs.writeFile(enPath, enContents, function(err) {
		if (err) {
			defer.reject(createError('could not create: ' + enPath + ' - ' + err.message));
			return;
		}

		var taskPath = path.join(pkgPath, 'task.loc.json');

		var contents = '' + _banner;
		contents += JSON.stringify(task, null, 2);

		fs.writeFile(taskPath, contents, function(err) {
			if (err) {
				defer.reject(createError('could not create: ' + taskPath + ' - ' + err.message));
				return;
			}

			// copy the loc assets back to the src so they can be checked in
			shell.cp('-f', enPath, enSrcPath);
			shell.cp('-f', taskPath, path.join(srcPath, 'task.loc.json'));

			defer.resolve();			
		});

	})

	return defer.promise;
};

function packageVsix(vsixPath, manifestDir) {
	var defer = Q.defer();

	shell.mkdir('-p', vsixPath);

    shell.pushd(manifestDir);

    var manifest = "extension-manifest.json";
    var commandLine = "vset package -m " + manifest + " -o " + vsixPath;
    exec(commandLine, function(err, stdout, stderr) {
        if (err) {
            shell.popd();
            defer.reject(err);
            return;
        }

        if (stdout) {
            gutil.log(stdout);
        }

        if (stderr) {
            gutil.log(stderr);
        }

        shell.popd();
        defer.resolve();
    });

    return defer.promise;
}

function packageTask(pkgPath){
    return through.obj(
		function(taskJson, encoding, done) {
		    if (!fs.existsSync(taskJson)) {
		        new gutil.PluginError('PackageTask', 'Task json cannot be found: ' + taskJson.path);
		    }

	        if (taskJson.isNull() || taskJson.isDirectory()) {
	            this.push(taskJson);
	            return callback();
	        }

	        var dirName = path.dirname(taskJson.path);
	        var folderName = path.basename(dirName);
	        var extensionPath = path.dirname(dirName);
	        var vsixPath= path.join(path.dirname(pkgPath), "Package");
	        var jsonContents = taskJson.contents.toString();
	        var task = {};

	        try {
	        	task = JSON.parse(jsonContents);
	        }
	        catch (err) {
	        	done(createError(folderName + ' parse error: ' + err.message));
	        	return;
	        }

	        var tgtPath;

	        validate(folderName, task)
	        .then(function() {
				gutil.log('Packaging: ' + task.name);
	        	
	        	tgtPath = path.join(pkgPath, task.name);
	        	shell.mkdir('-p', tgtPath);
	        	shell.cp('-R', path.join(dirName, '*'), tgtPath);
	        	shell.rm(path.join(tgtPath, '*.csproj'));
	        	shell.rm(path.join(tgtPath, '*.md'));
	        	return;        	
	        })
	        .then(function() {
	        	return createStrings(task, tgtPath, dirName);
	        })
	        .then(function() {
	        	done();
	        })
	        .fail(function(err) {
	        	done(err);
	        })
		});    
}
exports.PackageTask = packageTask;
exports.PackageVsix = packageVsix;
