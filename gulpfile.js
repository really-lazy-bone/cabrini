var del = require('del');
var gulp = require('gulp');
var livereload = require('gulp-livereload');

// A wrapper to call all other build task
gulp.task(
    'build',
    [
        'javascript',
        'stylesheet',
        'view',
        'libs'
    ],
    function() { }
);

gulp.task('watch', function() {
    gulp.watch('src/static/**/*', ['clean', 'build']);
});

gulp.task('clean', function(cb) {
    del(['build'], cb);
});

/**
 * For the JavaScript files, we are using webpack to pack up the JavaScript
 * files into one single bundle.js file
 */
gulp.task('javascript', ['clean'], function() {
    return gulp.src('src/static/javascripts/**/*')
        .pipe(gulp.dest('build/javascripts'));
});

gulp.task('stylesheet', ['clean'], function() {
    return gulp.src('src/static/stylesheets/**/*.css')
        .pipe(gulp.dest('build/stylesheets'));
});

gulp.task('view', ['clean'], function() {
    return gulp.src('src/static/views/**/*.html')
        .pipe(gulp.dest('build'));
});

gulp.task('libs', ['clean'], function() {
    return gulp.src('src/static/lib/**/*')
        .pipe(gulp.dest('build/lib'));
});

gulp.task('play', ['build'], function () {

    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 8080, app;

    livereload.listen();
    gulp.watch(['/src/static/**/*'], ['clean', 'build']);

    // serve everything that is static
    app = connect().use(serveStatic(__dirname + '/build'));
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port + '/');
    });
});
