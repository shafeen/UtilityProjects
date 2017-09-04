var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({lazy: true});

gulp.task('test', () => {
    console.log('hello i am a test gulp task');
});

gulp.task('js', () => {
    // EXAMPLE: (TODO: switch to using the concat file in layout.pug)
    // concat all angular js files, while controlling the order of files
    var js = gulp.src(['./ng-client/**/*.js', './ng-client-secure/**/*.js'])
        .pipe(plugins.concat('ng-client.js'));
    return js
        .pipe(gulp.dest('./public/build/js/'));
});
