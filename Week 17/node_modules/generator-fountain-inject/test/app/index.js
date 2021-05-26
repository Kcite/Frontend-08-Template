const path = require('path');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const _ = require('lodash');
const test = require('ava');
const TestUtils = require('fountain-generator').TestUtils;

let context;
const pkg = {
  devDependencies: {
    'bower': '^1.8.0',
    'gulp-inject': '^4.2.0',
    'main-bower-files': '^2.13.1',
    'wiredep': '^4.0.0'
  },
  scripts: {
    bower: 'bower'
  }
};

const bower = {
  name: 'fountain-inject',
  version: '0.0.1'
};

test.before(() => {
  context = TestUtils.mock('app');
  require('../../generators/app/index');
  process.chdir(path.resolve(__dirname, '../../'));
});

test.beforeEach(() => {
  context.updateJson['package.json'] = {
    dependencies: {}
  };
  context.copyTemplate.gulp_tasks = null; // eslint-disable-line camelcase
});

test(`Delete dependencies from 'package.json'`, t => {
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular1'});
  t.deepEqual(context.updateJson['package.json'], {});
});

test(`Add 'gulp-angular-filesort' to package.json and set bower.json`, t => {
  const expectedPkg = _.merge(pkg, {
    devDependencies: {'gulp-angular-filesort': '^1.1.1'}
  });
  context.updateJson['package.json'] = {
    dependencies: {angular: '^1.6.4'}
  };
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular1', js: 'js'});
  t.deepEqual(context.mergeJson['package.json'], expectedPkg);
  const expectedBower = _.merge(bower, {
    dependencies: {angular: '^1.6.4'},
    devDependencies: {'angular-mocks': '^1.6.4'}
  });
  t.deepEqual(context.mergeJson['bower.json'], expectedBower);
});

test(`Add 'gulp-typescript' to package.json and set bower.json`, t => {
  const expectedPkg = _.merge(pkg, {
    devDependencies: {'gulp-typescript': '^3.1.5'}
  });
  context.updateJson['package.json'] = {
    dependencies: {angular: '^2.0.0-rc.3'}
  };
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular2', js: 'typescript'});
  t.deepEqual(context.mergeJson['package.json'], expectedPkg);
  const expectedBower = _.merge(bower, {
    dependencies: {angular: '^2.0.0-rc.3'}
  });
  t.deepEqual(context.mergeJson['bower.json'], expectedBower);
});

test(`Delete 'react-dom' from bower.json`, t => {
  context.updateJson['package.json'] = {
    dependencies: {'react-dom': '^1.0.0'}
  };
  TestUtils.call(context, 'configuring.pkg', {framework: 'react'});
  t.deepEqual(context.mergeJson['bower.json'], bower);
});

test(`Add 'todomvc-app-css' override`, t => {
  const expected = _.merge(bower, {
    overrides: {
      'todomvc-app-css': {
        main: 'index.css'
      }
    }
  });
  TestUtils.call(context, 'configuring.pkg', {framework: 'react', sample: 'todoMVC'});
  t.deepEqual(context.mergeJson['bower.json'], expected);
});

test('Copy inject.js and scripts.js', t => {
  context.templatePath = path => path;
  context.destinationPath = path => path;
  TestUtils.call(context, 'writing.gulp');
  t.true(context.copyTemplate['gulp_tasks/inject.js'].length > 0);
  t.true(context.copyTemplate['gulp_tasks/scripts.js'].length > 0);
});

test('Call indexHtml 3 times', () => {
  context.templatePath = context.destinationPath = path => path;
  context.replaceInFileWithTemplate = () => {};
  const spy = chai.spy.on(context, 'replaceInFileWithTemplate');
  TestUtils.call(context, 'writing.indexHtml');
  expect(spy).to.have.been.called.exactly(3);
});

test('Call this.runInstall', () => {
  context.runInstall = () => {};
  const spy = chai.spy.on(context, 'runInstall');
  TestUtils.call(context, 'install');
  expect(spy).to.have.been.called.once();
});
