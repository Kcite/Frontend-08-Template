const conf = require('./gulp.conf');
const wiredep = require('wiredep');

module.exports = function () {
  const wiredepOptions = Object.assign({}, conf.wiredep, {
<% if (framework === 'react') { -%>
    overrides: {
      react: {main: ['react-with-addons.js', 'react-dom.js']}
    },
<% } -%>
    dependencies: true,
    devDependencies: true
  });

  const patterns = wiredep(wiredepOptions).js.concat([
<% if (framework === 'angular1') { -%>
<% if (sample === 'todoMVC') { -%>
    'node_modules/babel-polyfill/browser.js',
    `!${conf.path.tmp('**/*.spec.js')}`,
    conf.path.tmp('app/todos/todos.js'),
    conf.path.tmp('index.js'),
    conf.path.tmp('app/constants/*.js'),
    conf.path.tmp('app/containers/*.js'),
    conf.path.tmp('app/components/*.js'),
<% } -%>
    conf.path.tmp('**/*.js'),
    conf.path.src('**/*.html')
<% } -%>
<% if (framework === 'react') { -%>
<% if (sample === 'todoMVC') { -%>
    'node_modules/es6-shim/es6-shim.js',
    `!${conf.path.tmp('**/*.spec.js')}`,
    conf.path.tmp('app/constants/*.js'),
    conf.path.tmp('app/reducers/todos.js'),
    conf.path.tmp('app/reducers/index.js'),
    conf.path.tmp('app/actions/index.js'),
<% if (js === 'typescript') { -%>
    conf.path.tmp('app/assign.js'),
<% } -%>
    conf.path.tmp('app/components/*.js'),
    `${conf.path.tmp('**/*.spec.js')}`
<% } else { -%>
    conf.path.tmp('app/**/*.js')
<% } -%>
<% } -%>
  ]);

  const files = patterns.map(pattern => ({pattern}));
  files.push({
    pattern: conf.path.src('assets/**/*'),
    included: false,
    served: true,
    watched: false
  });
  return files;
};
