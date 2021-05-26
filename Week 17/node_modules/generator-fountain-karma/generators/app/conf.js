/* eslint complexity: "off" */

'use strict';

const lit = require('fountain-generator').lit;

module.exports = function karmaConf(options) {
  const conf = {
    basePath: '../',
    singleRun: options.singleRun,
    autoWatch: !options.singleRun,
    logLevel: 'INFO',
    junitReporter: {outputDir: 'test-reports'}
  };

  if (options.framework === 'angular2') {
    if (process.env.TRAVIS) {
      conf.browsers = ['Firefox'];
      conf.captureTimeout = 60000;
      conf.browserDisconnectTimeout = 10000;
      conf.browserDisconnectTolerance = 1;
      conf.browserNoActivityTimeout = 60000;
    } else {
      conf.browsers = ['Chrome'];
    }
  } else {
    conf.browsers = ['PhantomJS'];
  }

  const pathSrcJs = lit`conf.path.src('index.spec.js')`;
  const pathSrcHtml = lit`conf.path.src('**/*.html')`;

  if (options.modules === 'systemjs') {
    conf.frameworks = ['jasmine', 'jspm'];
  } else if (options.modules === 'inject' && options.framework === 'angular1') {
    conf.frameworks = ['phantomjs-shim', 'jasmine', 'angular-filesort'];
  } else {
    conf.frameworks = ['jasmine'];
  }

  if (options.framework !== 'angular2' && options.js === 'typescript') {
    conf.frameworks.push('es6-shim');
  }

  if (options.modules === 'webpack') {
    conf.files = [
      'node_modules/es6-shim/es6-shim.js',
      pathSrcJs
    ];

    if (options.framework === 'angular1') {
      conf.files.push(pathSrcHtml);
    }
  }
  if (options.modules === 'inject') {
    conf.files = lit`listFiles()`;
  }

  if (options.modules === 'webpack' || options.framework === 'angular1') {
    conf.preprocessors = {};
  }
  if (options.modules === 'webpack') {
    conf.preprocessors[pathSrcJs] = ['webpack'];
  }
  if (options.framework === 'angular1') {
    conf.preprocessors[pathSrcHtml] = ['ng-html2js'];
    if (options.modules === 'systemjs' && options.js === 'typescript') {
      conf.preprocessors[pathSrcHtml].push('generic');
      conf.genericPreprocessor = {
        rules: [lit`{
        process(content, file, done) {
          file.path = file.path.replace(/\\.js$/, '.ts');
          done(content);
        }
      }`]
      };
    }
  }

  if (options.framework === 'angular1') {
    conf.ngHtml2JsPreprocessor = {};

    if (options.modules !== 'systemjs') {
      conf.ngHtml2JsPreprocessor.stripPrefix = lit`\`\${conf.paths.src}/\``;
    }

    if (options.modules === 'inject') {
      conf.ngHtml2JsPreprocessor.moduleName = 'app';
      conf.angularFilesort = {
        whitelist: [lit`conf.path.tmp('**/!(*.html|*.spec|*.mock).js')`]
      };
    }
  }

  if (options.modules === 'webpack') {
    conf.reporters = lit`['progress', 'coverage']`;
    conf.coverageReporter = {
      type: 'html',
      dir: 'coverage/'
    };
    conf.webpack = lit`require('./webpack-test.conf')`;
    conf.webpackMiddleware = {noInfo: true};
  }

  if (options.modules === 'systemjs') {
    conf.jspm = {
      loadFiles: [],
      config: 'jspm.config.js',
      browser: 'jspm.test.js'
    };
    let files;
    if (options.js === 'typescript') {
      if (options.framework === 'react') {
        files = `conf.path.src('app/**/*.tsx')`;
      } else {
        files = `conf.path.src('app/**/*.ts')`;
      }
    } else {
      files = `conf.path.src('app/**/*.js')`;
    }
    if (options.framework === 'angular2') {
      // http://stackoverflow.com/questions/35873437/enfile-file-table-overflow-with-karma
      conf.jspm.loadFiles = lit`glob.sync(${files})`;
      conf.jspm.serveFiles = lit`glob.sync(conf.path.src('app/**/*.html'))`;
    } else if (options.framework === 'angular1') {
      conf.jspm.loadFiles.push(lit`${files}`);
      conf.jspm.loadFiles.push(lit`conf.path.src('**/*.html')`);
    } else {
      conf.jspm.loadFiles.push(lit`${files}`);
    }
  }

  conf.plugins = [
    lit`require('karma-jasmine')`,
    lit`require('karma-junit-reporter')`,
    lit`require('karma-coverage')`
  ];

  if (options.framework === 'angular2') {
    if (process.env.TRAVIS) {
      conf.plugins.push(lit`require('karma-firefox-launcher')`);
    } else {
      conf.plugins.push(lit`require('karma-chrome-launcher')`);
    }
  } else {
    conf.plugins.push(lit`require('karma-phantomjs-launcher')`);
    conf.plugins.push(lit`require('karma-phantomjs-shim')`);
  }
  if (options.framework === 'angular1') {
    conf.plugins.push(lit`require('karma-ng-html2js-preprocessor')`);
  }
  if (options.modules === 'webpack') {
    conf.plugins.push(lit`require('karma-webpack')`);
  }
  if (options.modules === 'systemjs') {
    conf.plugins.push(lit`require('karma-jspm')`);
  }
  if (options.modules === 'inject' && options.framework === 'angular1') {
    conf.plugins.push(lit`require('karma-angular-filesort')`);
  }
  if (options.modules === 'systemjs' && options.framework === 'angular1' && options.js === 'typescript') {
    conf.plugins.push(lit`require('karma-generic-preprocessor')`);
  }
  if (options.framework !== 'angular2' && options.js === 'typescript') {
    conf.plugins.push(lit`require('karma-es6-shim')`);
  }

  return conf;
};
