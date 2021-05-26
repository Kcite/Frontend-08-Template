const gulp = require('gulp');
<% if (js === 'babel' || framework === 'react' && js === 'js') { -%>
const babel = require('gulp-babel');
<% } -%>
<% if (js === 'typescript') { -%>
const sourcemaps = require('gulp-sourcemaps');
const typescript = require('gulp-typescript');
const tsConf = require('../tsconfig.json').compilerOptions;
<% } -%>
const conf = require('../conf/gulp.conf');

gulp.task('scripts', scripts);

function scripts() {
  return gulp.src(conf.path.src('**/*.js'))
<% if (js === 'babel' || framework === 'react' && js === 'js') { -%>
    .pipe(babel())
<% } -%>
<% if (js === 'typescript') { -%>
    .pipe(sourcemaps.init())
    .pipe(typescript(tsConf))
    .pipe(sourcemaps.write('./sourcemaps'))
<% } -%>
    .pipe(gulp.dest(conf.path.tmp()));
}
