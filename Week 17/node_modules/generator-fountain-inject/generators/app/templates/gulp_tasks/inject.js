const gulp = require('gulp');
const browserSync = require('browser-sync');
const wiredep = require('wiredep').stream;
<% if (framework === 'angular1') { -%>
const angularFilesort = require('gulp-angular-filesort');
<% } -%>
const gulpInject = require('gulp-inject');

const conf = require('../conf/gulp.conf');

gulp.task('inject', inject);

function inject() {
<% if (css === 'css') { -%>
  const injectStyles = gulp.src(conf.path.src('**/*.css'), {read: false});
<% } -%>
  const injectScripts = gulp.src([
<% if (framework === 'react') { -%>
<% if (sample === 'todoMVC') { -%>
    conf.path.tmp('app/constants/*.js'),
    conf.path.tmp('app/reducers/todos.js'),
    conf.path.tmp('app/reducers/index.js'),
    conf.path.tmp('app/actions/index.js'),
<% } -%>
    conf.path.tmp('**/!(index).js'),
    conf.path.tmp('**/index.js'),
<% } else if (framework === 'angular1' && sample === 'todoMVC') { -%>
    conf.path.tmp('app/todos/todos.js'),
    conf.path.tmp('index.js'),
    conf.path.tmp('app/constants/*.js'),
    conf.path.tmp('app/containers/*.js'),
    conf.path.tmp('app/components/*.js'),
    conf.path.tmp('**/*.js'),
<% } else { -%>
    conf.path.tmp('**/*.js'),
<% } -%>
    `!${conf.path.tmp('**/*.spec.js')}`
<% if (framework === 'angular1' && sample !== 'todoMVC') { -%>
  ])
  .pipe(angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));
<% } else { -%>
  ]);
<% } -%>

  const injectOptions = {
    ignorePath: [conf.paths.src, conf.paths.tmp],
    addRootSlash: false
  };

  return gulp.src(conf.path.src('index.html'))
<% if (css === 'css') { -%>
    .pipe(gulpInject(injectStyles, injectOptions))
<% } -%>
    .pipe(gulpInject(injectScripts, injectOptions))
    .pipe(wiredep(Object.assign({}, conf.wiredep)))
    .pipe(gulp.dest(conf.paths.tmp))
    .pipe(browserSync.stream());
}
