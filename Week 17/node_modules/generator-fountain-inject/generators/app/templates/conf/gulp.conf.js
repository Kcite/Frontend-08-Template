/**
 *  Wiredep is the lib which inject bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
<% if (css === 'css') { -%>
  exclude: [/\/bootstrap\.js$/],
<% } -%>
<% if (css === 'scss') { -%>
  exclude: [/\/bootstrap\.js$/, /\/bootstrap-sass\/.*\.js/, /\/bootstrap\.css/],
<% } -%>
  directory: 'bower_components'
};
