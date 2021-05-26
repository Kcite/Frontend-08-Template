<% if (modules === 'webpack' || modules === 'systemjs' || framework === 'angular1') { -%>
const conf = require('./gulp.conf');
<% } -%>
<% if (modules === 'inject') { -%>
const listFiles = require('./karma-files.conf');
<% } -%>
<% if (modules === 'systemjs' && framework === 'angular2') { -%>
const glob = require('glob');
<% } -%>

module.exports = function (config) {
  const configuration = <%- json(karmaConf, 2) %>;

  config.set(configuration);
};
