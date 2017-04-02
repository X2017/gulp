/**
 * Description：测试gulp
 * Created by ZhuYuan on 2017/3/30
 */
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();
gulp.task('copy',function(){
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'));
});
//编译less
gulp.task('less',function(){
    gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest("dist/css/"));
});
//压缩js
gulp.task('js',function(){
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
//自动刷新
gulp.task('serve', ['less','js'], function() {
    browserSync.init({
        server: "./dist/"
    });
    gulp.watch("src/less/*.less", ['less']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("src/*.html", ['copy']);
    gulp.watch("dist/css/*.css").on('change', browserSync.reload);
    gulp.watch("dist/js/*.js").on('change', browserSync.reload);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});