var ts = require('gulp-typescript');
var gulp = require('gulp');
var clean = require('gulp-clean');
var sourceMaps = require('gulp-sourcemaps');

var destPath = './wwwroot/libs/';

// Delete the dist directory
gulp.task('clean', function() {
    return gulp.src(destPath)
        .pipe(clean());
});

//Moves Angular 2 & related scripts to wwwroot folder of ASP.NET Core app
gulp.task("scriptsNStyles", () => {
    gulp.src([
        'es6-shim/es6-shim.min.js',
        'systemjs/dist/system-polyfills.js',
        'systemjs/dist/system.src.js',
        'reflect-metadata/Reflect.js',
        'rxjs/**',
        'zone.js/dist/**',
        '@angular/**',
        'jquery/dist/jquery.*js',
        'bootstrap/dist/js/bootstrap*.js'
    ], {
        cwd: "node_modules/**"
    })
    .pipe(gulp.dest("./wwwroot/libs"));

    gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'css/*.css'
    ]).pipe(gulp.dest('./wwwroot/libs/css'));
});

//ts - task to transpile TypeScript files to JavaScript using Gulp-TypeScript 
var tsProject = ts.createProject('tsconfig.json');
gulp.task('ts', function(done) {
    return tsProject.src()
        .pipe(sourceMaps.init())
        .pipe(ts(tsProject), undefined, ts.reporter.fullReporter())
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest('./wwwroot/js'));
});

gulp.task('watch', ['watch.ts']);

gulp.task('watch.ts', ['ts'], function() {
    return gulp.watch('scripts/*.ts', ['ts']);
});

gulp.task('default', ['scriptsNStyles', 'watch']);