const path = require("path");
const gulp = require('gulp');
const template = require('gulp-template');
const webpack = require('gulp-webpack');
const rename = require('gulp-rename');
const ts = require("gulp-typescript");
const yargs = require("yargs");

var exec = require('child_process').exec;

const tsProject = ts.createProject('tsconfig.json', {
    typescript: require('typescript')
});

var argv = yargs.string("publisher").argv;

const publisherIdOverride = argv.publisher || "";
const isBundled = argv.local ? false : true;
const distFolder = 'dist';
const contentFolder = isBundled ? distFolder : '.';

var templateValues = {};

if (isBundled) {
    templateValues.head = `
    <link href="css/fabric.min.css" rel="stylesheet" />
    <link href="css/main.css" rel="stylesheet" />
    <script src="scripts/VSS.SDK.min.js"></script>
    `;

    templateValues.init = `
        VSS.init({
            usePlatformScripts: true, 
            usePlatformStyles: true
        });

        VSS.require(["scripts/bundle"], function (Bundle) {
            Bundle.init("work-item-search-view");
        });    
    `;
}
else {
    templateValues.head = `
    <link href="node_modules/office-ui-fabric-react/dist/css/fabric.css" rel="stylesheet" />
    <link href="css/main.css" rel="stylesheet" />
    <script src="node_modules/vss-web-extension-sdk/lib/VSS.SDK.js"></script>
    `;

    templateValues.init = `
        VSS.init({
            usePlatformScripts: true, 
            usePlatformStyles: true,
            moduleLoaderConfig: {
                paths: {
                    "OfficeFabric": "node_modules/office-ui-fabric-react/lib-amd",
                    "@microsoft/load-themed-styles": "node_modules/office-ui-fabric-react/node_modules/@microsoft/load-themed-styles/lib-amd/index",
                    "tslib": "node_modules/office-ui-fabric-react/node_modules/tslib/tslib",
                    "prop-types": "node_modules/office-ui-fabric-react/node_modules/prop-types/prop-types",
                    "glamor": "node_modules/office-ui-fabric-react/node_modules/@uifabric/styling/node_modules/glamor/umd/index",
                    "rtl-css-js": "node_modules/office-ui-fabric-react/node_modules/@uifabric/styling/node_modules/rtl-css-js/dist/index.umd"
                }
            }
        });

        VSS.require(["scripts/WorkItemSearchComponent"], function (WorkItemSearchComponent) {
            WorkItemSearchComponent.init("work-item-search-view");
        });    
    `;
}

gulp.task('template', () => {
    return gulp.src('index.html.template')
        .pipe(template(templateValues))
        .pipe(rename(function(path) {
            path.basename = 'index';
            path.extname = '.html';
        }))
        .pipe(gulp.dest(contentFolder));
});

gulp.task('build', () => {
    var tsResult = gulp.src(['scripts/**/*.tsx', 'scripts/**/*.ts'])
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('scripts'));
});


gulp.task('copy', ['build'], () => {
    if (isBundled) {
        gulp.src('node_modules/vss-web-extension-sdk/lib/VSS.SDK.min.js')
            .pipe(gulp.dest(contentFolder + '/scripts'));

        return gulp.src(['node_modules/office-ui-fabric-react/dist/*css/*.min.css', '*css/*.css'])
            .pipe(gulp.dest(contentFolder));
    } else {
        return true;
    }
});

gulp.task('webpack', ['copy'], () => {
    if (isBundled) {
        return gulp.src('./scripts/WorkItemSearchComponent.js')
            .pipe(webpack(require('./webpack.config.js')))
            .pipe(gulp.dest(contentFolder + "/scripts"));

    } else {
        return true;
    }
});

gulp.task('tfxpack', ['webpack'], ()=> {
    const rootArg = `--root ${contentFolder}`;
    const outputPathArg = `--output-path ${distFolder}`;
    const manifestsArg = `--manifests ${isBundled ? '../' : ''}manifests/base.json`; 
    const overridesFileArg = `--overrides-file manifests/${isBundled ? 'bundled.json' : 'local.json'}`;
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

gulp.task('default', ['template', 'tfxpack']);