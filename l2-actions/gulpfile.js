const path = require("path");
const gulp = require('gulp');
const ts = require("gulp-typescript");
const yargs = require("yargs");

var exec = require('child_process').exec;

const tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});

var argv = yargs.string("publisher").argv;

const publisherIdOverride = argv.publisher || "";
const isProduction = argv.local ? false : true;
const distFolder = 'dist';
const contentFolder = isProduction ? distFolder : '.';

gulp.task('build', () => {
    var tsResult = gulp.src(['scripts/**/*.ts'])
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('scripts'));
});


gulp.task('copy', ['build'], () => {
    if (isProduction) {
        return gulp.src('node_modules/vss-web-extension-sdk/lib/VSS.SDK.min.js')
            .pipe(gulp.dest(contentFolder + '/scripts'));
    } else {
        return true;
    }
});

gulp.task('tfxpack', ['copy'], ()=> {
    const rootArg = `--root ${contentFolder}`;
    const outputPathArg = `--output-path ${distFolder}`;
    const manifestsArg = `--manifests ${isProduction ? '../' : ''}manifests/base.json`; 
    const overridesFileArg = `--overrides-file manifests/${isProduction ? 'bundled.json' : 'local.json'}`;
    const publisherOverrideArg = publisherIdOverride != "" ? `--publisher ${publisherIdOverride}` : '';

    // run tfx
    exec(`${path.join(__dirname, "node_modules", ".bin", "tfx.cmd")} extension create ${rootArg} ${outputPathArg} ${manifestsArg} ${overridesFileArg} ${publisherOverrideArg} --rev-version`,
        (err, stdout, stderr) => {
            if (err) {
                console.log(err);
            }

            console.log(stdout);
            console.log(stderr);
        });
});

gulp.task('default', ['tfxpack']);