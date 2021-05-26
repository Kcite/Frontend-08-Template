const test = require('ava');

let browsersyncConf;

test.before(() => {
  browsersyncConf = require('../../../generators/app/conf');
});

test(`browsersyncConf when dist is true`, t => {
  const templateVars = {dist: true};
  const expected = {
    server: {
      baseDir: ['lit>>conf.paths.dist<<lit']
    },
    open: false
  };
  const result = browsersyncConf(templateVars);
  t.deepEqual(result, expected);
});

test(`browsersyncConf when modules is 'inject'`, t => {
  const templateVars = {modules: 'inject'};
  const expected = {
    server: {
      baseDir: ['lit>>conf.paths.tmp<<lit', 'lit>>conf.paths.src<<lit'],
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    open: false
  };
  const result = browsersyncConf(templateVars);
  t.deepEqual(result, expected);
});

test(`browsersyncConf when modules is 'systemjs'`, t => {
  const templateVars = {modules: 'systemjs'};
  const expected = {
    server: {
      baseDir: ['lit>>conf.paths.src<<lit', 'lit>>conf.paths.tmp<<lit'],
      routes: {
        '/jspm_packages': 'jspm_packages',
        '/jspm.config.js': 'jspm.config.js',
        '/jspm.browser.js': 'jspm.browser.js',
        '/src': 'src'
      }
    },
    open: false
  };
  const result = browsersyncConf(templateVars);
  t.deepEqual(result, expected);
});

test(`browsersyncConf when modules is 'webpack'`, t => {
  const templateVars = {modules: 'webpack'};
  const expected = {
    server: {
      baseDir: ['lit>>conf.paths.tmp<<lit', 'lit>>conf.paths.src<<lit']
    },
    open: false
  };
  const result = browsersyncConf(templateVars);
  t.deepEqual(result, expected);
});

test(`browsersyncConf when modules is 'webpack' and webpackHotReload is true`, t => {
  const templateVars = {webpackHotReload: true, modules: 'webpack'};
  const expected = {
    server: {
      baseDir: ['lit>>conf.paths.tmp<<lit', 'lit>>conf.paths.src<<lit'],
      middleware: [`lit>>webpackDevMiddleware(webpackBundler, {
        // IMPORTANT: dev middleware can't access config, so we should
        // provide publicPath by ourselves
        publicPath: webpackConf.output.publicPath,

        // Quiet verbose output in console
        quiet: true
      }),

      // bundler should be the same as above
      webpackHotMiddleware(webpackBundler)<<lit`]
    },
    open: false
  };
  const result = browsersyncConf(templateVars);
  t.deepEqual(result, expected);
});
