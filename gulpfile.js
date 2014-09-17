var gulp = require('gulp'),
    stylus = require('gulp-stylus');

gulp.task('default', ['stylus'], function() {});

gulp.task('stylus', function() {
    gulp
        .src('./stylus/style.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./css'));
});

gulp.watch('./stylus/*.styl', ['stylus']);