const gulp = require('gulp');
const del = require('del');
//const plumber = require('gulp-plumber');
//const rename = require('gulp-rename');
//const autoprefixer = require('gulp-autoprefixer');
//const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
//const imagemin = require('gulp-imagemin');
//const cache = require('gulp-cache');
//const sass = require('gulp-sass');
//const browserSync = require('browser-sync');
/*
gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

//gulp.task('images', function(){
//gulp.src('src/images/**///*')
//    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
//    .pipe(gulp.dest('dist/images/'));
//});

function cleanBootstrap() {
  return del(["public/bootstrap/*"]);
}

function cleanJquery() {
  return del(["public/jquery/*"]);
}

function bootstrapCSS() {
  return gulp.src('node_modules/bootstrap/dist/css/bootstrap.css')
    .pipe(gulp.dest('public/bootstrap/css'));

};

function bootstrapJS()  {
  return gulp.src('node_modules/bootstrap/dist/js/bootstrap.js')
    .pipe(gulp.dest('public/bootstrap/js'));
}
function jquery()  {
  return gulp.src('node_modules/jquery/dist/jquery.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/jquery/'));
    //.pipe(browserSync.reload({stream:true}))

};

//gulp.task('default', ['browser-sync'], function(){
  //gulp.watch("node_module/bootstrap/dist/*", ['bootstrap']);
  //gulp.watch("node_module/jquery/dist/jquery.min.js", ['jquery']);
//  gulp.watch("*.html", ['bs-reload']);
//});

const build = gulp.series(cleanJquery, cleanBootstrap, gulp.parallel(jquery, bootstrapCSS, bootstrapJS))

exports.bootstrapCSS = bootstrapCSS;
exports.bootstrapJS = bootstrapJS;
exports.jquery = jquery;
exports.build = build;
//exports.default = bs-reload
//exports.default = browser-sync
