var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sass({
            outputStyle: 'compressed' //minifikacja pliku css
        }))
        .pipe(rename({
            suffix: '.min' //zmiana nazwy pliku css
        }))
        .pipe(gulp.dest('src/css/'))
        .pipe(browserSync.stream());
});

gulp.task("typescr", function() {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("src/js"));
});

//Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./src"
    });

    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/ts/app.ts', ['typescr']);
    gulp.watch("src/index.html").on('change', browserSync.reload);
});


gulp.task('default', ['serve', 'typescr']);