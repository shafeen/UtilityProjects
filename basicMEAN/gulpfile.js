var gulp = require('gulp');
var argv = require('yargs').argv;
var plugins = require('gulp-load-plugins')({lazy: true});

gulp.task('test', () => {
    console.log('hello i am a test gulp task');
});

// testing a programmatic way to add a view to basicMEAN
// TODO: add to config.js
// TODO: find a way to add the js file to the layout file programmatically
gulp.task('add-view', () => {
    var viewName = argv.name ? argv.name.toLowerCase() : null;
    var protectedView = false;
    if (!viewName || viewName.length < 2) {
        console.log('Invalid view name provided, exiting gulp task.');
        return;
    }

    var destFolder = './ng-client/view-' + viewName + '/';
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
    var js = gulp.src(['./ng-client/**/*.js', './ng-client-secure/**/*.js'])
        .pipe(plugins.concat('ng-client.js'));

    var uglify = plugins.uglifyEs.default;
    return js
        .pipe(gulp.dest('./public/build/js/'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/build/min-js/'));
});

gulp.task('replace-test', () => {

});

gulp.task('inject-test', () => {
    let angularJsFiles = gulp.src(['./ng-client/**/*.js', './ng-client-secure/**/*.js'], {read: true});
    let target = gulp.src('./views/layout.pug');
    return target
        .pipe(plugins.inject(
            angularJsFiles.pipe(plugins.concat('ng-client.js')).pipe(gulp.dest('./public/build/')), {ignorePath:['public']}
        )).pipe(gulp.dest('./views/'));
});