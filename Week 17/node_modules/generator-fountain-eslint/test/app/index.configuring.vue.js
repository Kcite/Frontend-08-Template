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

test('Configuring package.json: vue/webpack/babel', t => {
  TestUtils.call(context, 'configuring.pkg', {framework: 'vue', modules: 'webpack', js: 'babel'});
  const expected = merge([u.vueBase, u.base, u.webpackBase, u.babelBase, u.babelTypescriptBase]);
  t.deepEqual(context.mergeJson['package.json'], expected);
});
