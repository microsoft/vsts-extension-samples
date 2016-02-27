module.exports = function (grunt) {
    
    grunt.initConfig({
        ts: {
            default: {
                tsconfig: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-ts');
    
    grunt.registerTask('default', ['ts']);
};