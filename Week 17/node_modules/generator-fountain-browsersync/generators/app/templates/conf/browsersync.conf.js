const conf = require('./gulp.conf');
<% if (!dist && webpackHotReload) { -%>

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConf = require('./webpack.conf');
const webpackBundler = webpack(webpackConf);
<% } -%>

module.exports = function () {
  return <%- json(browsersyncConf, 2) %>;
};
