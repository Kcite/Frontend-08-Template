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

test('Configuring package.json: angular1/webpack/babel', t => {
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular1', modules: 'webpack', js: 'babel'});
  const expected = merge([u.angular1Base, u.base, u.webpackBase, u.babelBase, u.babelTypescriptBase]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: angular1/webpack/js', t => {
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular1', modules: 'webpack', js: 'js'});
  const expected = merge([u.angular1Base, u.base, u.webpackBase, u.jsBase]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: angular1/webpack/ts', t => {
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular1', modules: 'webpack', js: 'typescript'});
  const expected = merge([u.angular1Base, u.base, u.webpackBase, u.babelTypescriptBase]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: angular1/systemjs/babel', t => {
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular1', modules: 'systemjs', js: 'babel'});
  const expected = merge([u.angular1Base, u.base, u.systemjsBase, u.babelBase, u.babelTypescriptBase, {
    jspm: {
      dependencies: {babel: 'npm:babel-core@^6.23.1'},
      devDependencies: {'plugin-babel': 'npm:systemjs-plugin-babel@^0.0.21'}
    }
  }]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: angular1/systemjs/js', t => {
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular1', modules: 'systemjs', js: 'js'});
  const expected = merge([u.angular1Base, u.base, u.systemjsBase, u.jsBase, {
    jspm: {
      dependencies: {babel: 'npm:babel-core@^6.23.1'},
      devDependencies: {'plugin-babel': 'npm:systemjs-plugin-babel@^0.0.21'}
    }
  }]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: angular1/systemjs/ts', t => {
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular1', modules: 'systemjs', js: 'typescript'});
  const expected = merge([u.angular1Base, u.base, u.systemjsBase, u.babelTypescriptBase]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: angular1/inject/babel', t => {
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular1', modules: 'inject', js: 'babel'});
  const expected = merge([u.angular1Base, u.base, u.injectBase, u.injectAngular1, u.babelBase, u.babelTypescriptBase, {
    devDependencies: {'gulp-babel': '^6.1.2'}
  }]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: angular1/inject/js', t => {
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular1', modules: 'inject', js: 'js'});
  const expected = merge([u.angular1Base, u.base, u.injectBase, u.injectAngular1, u.jsBase]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: angular1/inject/ts', t => {
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular1', modules: 'inject', js: 'typescript'});
  const expected = merge([u.angular1Base, u.base, u.injectBase, u.injectAngular1, u.babelTypescriptBase]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});

test('Configuring package.json: angular1/inject/js/todoMVC', t => {
  TestUtils.call(context, 'configuring.pkg', {framework: 'angular1', modules: 'inject', js: 'js', sample: 'todoMVC'});
  const expected = merge([u.angular1Base, u.base, u.injectBase, u.injectAngular1, u.jsBase, {
    eslintConfig: {
      rules: {
        'no-undef': 0,
        'no-unused-vars': 0
      }
    }
  }]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});
