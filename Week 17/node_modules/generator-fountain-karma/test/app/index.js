const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
const should = chai.should(); // eslint-disable-line no-unused-vars
chai.use(spies);
const _ = require('lodash');
const test = require('ava');
const TestUtils = require('fountain-generator').TestUtils;

let context;
const pkg = {
  devDependencies: {
    'karma': '^1.4.1',
    'karma-coverage': '^1.1.1',
    'karma-jasmine': '^1.1.0',
    'karma-junit-reporter': '^1.2.0',
    'jasmine': '^2.5.3',
    'es6-shim': '^0.35.3'
  }
};

test.before(() => {
  context = TestUtils.mock('app');
  require('../../generators/app/index');
  process.chdir(path.resolve(__dirname, '../../'));
});

test.beforeEach(() => {
  context.mergeJson['package.json'] = {};
});

test.afterEach(() => {
  delete process.env.TRAVIS;
});

test('Configure package.json  with angular1/webpack', t => {
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'angular-mocks': '^1.6.2',
      'gulp-ng-annotate': '^2.0.0',
      'karma-angular-filesort': '^1.0.2',
      'karma-ng-html2js-preprocessor': '^1.0.0',
      'karma-phantomjs-launcher': '^1.0.2',
      'karma-phantomjs-shim': '^1.4.0',
      'phantomjs-prebuilt': '^2.1.14',
      'karma-webpack': '^2.0.2'
    },
    eslintConfig: {
      globals: {
        expect: true
      }
    }
  });
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular1', modules: 'webpack'});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configure package.json  with angular1/inject/typescript', t => {
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'angular-mocks': '^1.6.2',
      'gulp-ng-annotate': '^2.0.0',
      'karma-angular-filesort': '^1.0.2',
      'karma-ng-html2js-preprocessor': '^1.0.0',
      'karma-es6-shim': '^1.0.0',
      'karma-phantomjs-launcher': '^1.0.2',
      'karma-phantomjs-shim': '^1.4.0',
      'phantomjs-prebuilt': '^2.1.14'
    },
    eslintConfig: {
      globals: {
        expect: true
      }
    }
  });
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular1', modules: 'inject', js: 'typescript'});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configure package.json  with angular2/systemjs/typescript', t => {
  process.env.TRAVIS = 'travis';
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'karma-firefox-launcher': '^1.0.0',
      'glob': '^7.1.1',
      'karma-jspm': '^2.2.1'
    }
  });
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular2', modules: 'systemjs', js: 'typescript'});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configure package.json  with angular2/webpack/typescript', t => {
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'karma-chrome-launcher': '^2.0.0',
      'karma-webpack': '^2.0.2'
    }
  });
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular2', modules: 'webpack', js: 'typescript'});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configure package.json  with angular1/systemjs/typescript', t => {
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'angular-mocks': '^1.6.2',
      'gulp-ng-annotate': '^2.0.0',
      'karma-angular-filesort': '^1.0.2',
      'karma-ng-html2js-preprocessor': '^1.0.0',
      'karma-generic-preprocessor': '^1.1.0',
      'karma-es6-shim': '^1.0.0',
      'karma-phantomjs-launcher': '^1.0.2',
      'karma-phantomjs-shim': '^1.4.0',
      'phantomjs-prebuilt': '^2.1.14',
      'karma-jspm': '^2.2.1'
    },
    eslintConfig: {
      globals: {
        expect: true
      }
    }
  });
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular1', modules: 'systemjs', js: 'typescript'});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configure package.json  with angular1/systemjs/babel', t => {
  const expected = _.merge({}, pkg, {
    devDependencies: {
      'angular-mocks': '^1.6.2',
      'gulp-ng-annotate': '^2.0.0',
      'karma-angular-filesort': '^1.0.2',
      'karma-ng-html2js-preprocessor': '^1.0.0',
      'karma-phantomjs-launcher': '^1.0.2',
      'karma-phantomjs-shim': '^1.4.0',
      'phantomjs-prebuilt': '^2.1.14',
      'karma-jspm': '^2.2.1',
      'babel-plugin-istanbul': '^4.0.0'
    },
    eslintConfig: {
      globals: {
        expect: true
      }
    }
  });
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular1', modules: 'systemjs', js: 'babel'});
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Copy karma.conf.js and karma-auto.conf.js when modules is systemjs', t => {
  TestUtils.call(context, 'configuring.conf', {modules: 'systemjs'});
  t.true(context.copyTemplate['conf/karma.conf.js'].length > 0);
  t.true(context.copyTemplate['conf/karma-auto.conf.js'].length > 0);
});

test('Copy karma.conf.js, karma-files.conf.js and karma-auto.conf.js when modules is inject', t => {
  TestUtils.call(context, 'configuring.conf', {modules: 'inject'});
  t.true(context.copyTemplate['conf/karma.conf.js'].length > 0);
  t.true(context.copyTemplate['conf/karma-auto.conf.js'].length > 0);
  t.true(context.copyTemplate['conf/karma-files.conf.js'].length > 0);
});

test('gulp(): Call this.fs.copyTpl once', () => {
  context.templatePath = context.destinationPath = path => path;
  context.fs = {
    copyTpl: () => {}
  };
  const spy = chai.spy.on(context.fs, 'copyTpl');
  TestUtils.call(context, 'writing.gulp');
  expect(spy).to.have.been.called.once();
});

test('src(): Call this.fs.copyTpl once when modules is webpack', () => {
  context.templatePath = context.destinationPath = path => path;
  context.fs = {
    copyTpl: () => {}
  };
  const spy = chai.spy.on(context.fs, 'copyTpl');
  TestUtils.call(context, 'writing.src', {modules: 'webpack'});
  expect(spy).to.have.been.called.once();
});

test('src(): Call this.fs.copyTpl once when modules is inject', () => {
  context.templatePath = context.destinationPath = path => path;
  context.fs = {
    copyTpl: () => {}
  };
  const spy = chai.spy.on(context.fs, 'copyTpl');
  TestUtils.call(context, 'writing.src', {modules: 'inject'});
  spy.should.have.not.been.called();
});
