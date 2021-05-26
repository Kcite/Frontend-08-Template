const test = require('ava');
const _ = require('lodash');
const TestUtils = require('fountain-generator').TestUtils;
const u = require('../utils');

let context;

function merge(args) {
  const result = {};
  _.mergeWith(result, ...args, (x, y) => {
    if (_.isArray(x)) {
      return _.uniq(x.concat(y));
    }
  });
  return result;
}

test.before(() => {
  context = TestUtils.mock('app');
  require('../../generators/app/index');
});

test.beforeEach(() => {
  context.mergeJson['package.json'] = {};
});

test('Configuring package.json: angular2/webpack/babel', t => {
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular2', modules: 'webpack', js: 'babel'});
  const expected = merge([u.base, u.webpackBase, u.babelBase, u.babelTypescriptBase, u.angular2NotTypescriptBase]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: angular2/webpack/js', t => {
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular2', modules: 'webpack', js: 'js'});
  const expected = merge([u.base, u.webpackBase, u.jsBase, u.angular2NotTypescriptBase]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: angular2/webpack/typescript', t => {
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular2', modules: 'webpack', js: 'typescript'});
  const expected = merge([u.base, u.webpackBase, u.babelTypescriptBase]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: angular2/systemjs/babel', t => {
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular2', modules: 'systemjs', js: 'babel'});
  const expected = merge([u.base, u.systemjsBase, u.systemjsAngular2, u.babelBase, u.babelTypescriptBase, u.angular2NotTypescriptBase, {
    jspm: {
      dependencies: {babel: 'npm:babel-core@^6.23.1'},
      devDependencies: {'plugin-babel': 'npm:systemjs-plugin-babel@^0.0.21'}
    }
  }]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: angular2/systemjs/js', t => {
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular2', modules: 'systemjs', js: 'js'});
  const expected = merge([u.base, u.systemjsBase, u.jsBase, u.systemjsAngular2, u.angular2NotTypescriptBase, {
    jspm: {
      dependencies: {babel: 'npm:babel-core@^6.23.1'},
      devDependencies: {'plugin-babel': 'npm:systemjs-plugin-babel@^0.0.21'}
    }
  }]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: angular2/systemjs/typescript', t => {
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular2', modules: 'systemjs', js: 'typescript'});
  const expected = merge([u.base, u.systemjsBase, u.babelTypescriptBase, u.systemjsAngular2]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});
