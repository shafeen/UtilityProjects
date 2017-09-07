const gulp = require('gulp');
const argv = require('yargs').argv;
const plugins = require('gulp-load-plugins')({lazy: true});

const BUILD_PATH = './public/build/';

gulp.task('test', () => {
    console.log('hello i am a test gulp task');
});

// testing a programmatic way to add a view to basicMEAN
// TODO: add to config.js
// TODO: find a way to add the js file to the layout file programmatically
gulp.task('add-view', () => {
    let viewName = argv.name ? argv.name.toLowerCase() : null;
    let protectedView = false;
    if (!viewName || viewName.length < 2) {
        console.log('Invalid view name provided, exiting gulp task.');
        return;
    }

    let destFolder = './ng-client/view-' + viewName + '/';
    plugins.file('View'+viewName[0].toUpperCase()+viewName.substr(1)+'Ctrl.js',
        "angular.module('basicMEAN')\n.controller('"+
        'View'+viewName[0].toUpperCase()+viewName.substr(1)+'Ctrl' +"', function () {\n});",
        {src: true})
        .pipe(gulp.dest(destFolder));

    return plugins.file('view-' + viewName + '.pug', '', {src: true})
        .pipe(gulp.dest(destFolder));
});

gulp.task('js-concat-minify', () => {
    // EXAMPLE: (TODO: switch to using the concat file in layout.pug)
    // concat all angular js files, while controlling the order of files
    let js = gulp.src(['./ng-client/**/*.js', './ng-client-secure/**/*.js'])
        .pipe(plugins.concat('ng-client.js'));

    let uglify = plugins.uglifyEs.default;
    return js
        .pipe(gulp.dest('./public/build/js/'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/build/min-js/'));
});

gulp.task('replace-test', () => {

});

gulp.task('build-ng-client', () => {
    let angularfilesGlob = ['./ng-client/**/*.js', './ng-client-secure/**/*.js'];
    let angularJsFiles = gulp.src(angularfilesGlob);
    return angularJsFiles.pipe(plugins.concat('ng-client.js'))
        .pipe(plugins.uglifyEs.default())
        .pipe(plugins.rename('ng-client.min.js'))
        .pipe(gulp.dest(BUILD_PATH));
});

gulp.task('watch-angular', ['build-ng-client'], () => {
    let angularfilesGlob = ['./ng-client/**/*.js', './ng-client-secure/**/*.js'];
    return plugins.watch(angularfilesGlob, () => {
        let angularJsFiles = gulp.src(angularfilesGlob);
        return angularJsFiles.pipe(plugins.concat('ng-client.js'))
            .pipe(plugins.uglifyEs.default())
            .pipe(plugins.rename('ng-client.min.js'))
            .pipe(gulp.dest(BUILD_PATH));
    });
});

gulp.task('inject-test', () => {
    let angularJsFiles = gulp.src(['./ng-client/**/*.js', './ng-client-secure/**/*.js'], {read: true})
        .pipe(plugins.concat('ng-client.js'))
        .pipe(plugins.uglifyEs.default())
        .pipe(plugins.rename('ng-client.min.js'))
        .pipe(gulp.dest(BUILD_PATH));
    let target = gulp.src('./views/layout.pug');
    return target
        .pipe(plugins.inject(angularJsFiles, {ignorePath:['public']}))
        .pipe(gulp.dest('./views/'));
});
