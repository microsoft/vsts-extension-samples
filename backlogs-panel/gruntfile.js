module.exports = function (grunt) {
    grunt.initConfig({
        ts: {
            build: {
                tsconfig: true
            },
            options: {
                fast: 'never'
            }
        },
        exec: {
            package: {
                command: "tfx extension create --manifests vss-extension.json",
                stdout: true,
                stderr: true
            }
        },
        copy: {
            scripts: {
                files: [{
                    expand: true, 
                    flatten: true, 
                    src: ["node_modules/vss-web-extension-sdk/lib/VSS.SDK.min.js"], 
                    dest: "dist",
                    filter: "isFile" 
                }]
            }, 
            styles: {
                files: [{
                    flatten: true,
                    expand: true,
                    src: ["styles/main.css"],
                    dest: "dist",
                    filter: "isFile"
                }]
            }
        },
        
        clean: ["scripts/**/*.js", "*.vsix", "dist"]
    });
    
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks("grunt-exec");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask("build", ["ts:build", "copy:scripts", "copy:styles"]);
    grunt.registerTask("package", ["build", "exec:package"]);
    
    grunt.registerTask("default", ["package"]);
};