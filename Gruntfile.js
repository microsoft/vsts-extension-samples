var url = require('url');

module.exports = function (grunt) {

  // Caller-provided options  
  var baseUri = grunt.option('baseUri') || 'https://vsoteamcalendar.blob.core.windows.net/vso-extension-samples';
  var release = grunt.option('release');
  var publisher = grunt.option('publisher') || 'fabrikam';
  
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-azure-blob');
  
  // Initialize the list of samples to build
  var samplesToBuild;
  if(grunt.option('sample')) {
    samplesToBuild = [ grunt.option('sample') ];
  } else {
    samplesToBuild = [
      "build-inspector",
      "contributions-guide",
      "branch-delete",
      "public-events"
    ];
  }
  
  // Project configuration
  grunt.initConfig({
    dirs: {
      output: {
        packages: "dist/packages/",
        web: "dist/static/"
      }
    },
    clean: {
        dist: ['dist']
    }
  });

  var typeScriptConfig = {};
  var copyConfig = {};
  var prepManifestConfig = {};
  samplesToBuild.forEach(function (name) {    
    // Typescript task options
    typeScriptConfig[name] = {
      src: [name + '/scripts/**/*.ts'],
      dest: '<%= dirs.output.web %>' + name,
      options: {
        module: 'amd',
        target: 'es5',
        rootDir: name,
        sourceMap: false,
        declaration: false
      }
    };

    // Static content and extension manifest task options
    copyConfig[name] = {
      files: [ 
        {
          expand: true,
          cwd: name,
          src: '**/*.{html,css,png,jpg,js}',
          dest: '<%= dirs.output.web %>' + name
        },
        {
          expand: true,
          cwd: name,
          src: 'vss-extension.json',
          dest: '<%= dirs.output.packages %>' + name
        },
        {
          expand: true,
          cwd: name,
          src: 'images/**',
          dest: '<%= dirs.output.packages %>' + name
        }
      ]
    };
    
    // Prep manifest for packaging options
    prepManifestConfig[name] = {      
      manifest: '<%= dirs.output.packages %>' + name + '/vss-extension.json',
      newBaseUri: baseUri + '/' + (release ? release + '/' : "") + name     
    };
  });
  grunt.config('typescript', typeScriptConfig);
  grunt.config('copy', copyConfig);
  grunt.config('prepManifest', prepManifestConfig);
  
  // Task to copy static content to Azure Blob Storage
  grunt.config('azure-blob', {
    options: { 
      containerName: 'vso-extension-samples',
      containerDelete: false, 
      gzip: false,
      copySimulation: false
    },
    dist: {
      files: [
        {
          expand: true,
          cwd: '<%= dirs.output.web %>',
          src: ['**/*'],
          dest: release
        }
      ]
    }
  });
    
  // Register build task
  grunt.registerTask('build', [ 'clean', 'typescript', 'copy' ]);
  
  // Register custom "prep manifest" task
  grunt.task.registerMultiTask('prepManifest', 'Prep the manifest by updating base URI and publisher', function() {
      // Update extension manifest with updated base URI
      var manifest = grunt.file.readJSON(this.data.manifest);
      
      // Update base URI
      manifest.baseUri = this.data.newBaseUri;
      
      // Update publisher
      manifest.publisher = publisher;
      
      grunt.file.write(this.data.manifest, JSON.stringify(manifest, null, 2));
  }); 
  
  // Register prep package and deploy tasks
  grunt.registerTask('prepPackage', [ 'build', 'prepManifest']);  
  grunt.registerTask('deploy', [ 'prepPackage', 'azure-blob' ]);
        
  grunt.registerTask('default', [ 'build' ]);
};
