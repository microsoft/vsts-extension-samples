module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        exec: {
            package: {
                command: "tfx extension create",
                stdout: true,
                stderr: true
            }
        },
        copy: {
            main: {
                files: [
                  {
					  expand: true,
					  flatten: true,
                      src: [
                          'node_modules/vss-sdk/lib/VSS.SDK.min.js'
                      ],
                      dest: 'sdk/scripts',
					  filter: 'isFile'
                  }
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-contrib-copy");
};