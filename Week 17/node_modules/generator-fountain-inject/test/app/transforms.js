const path = require('path');
const test = require('ava');
const TestUtils = require('fountain-generator').TestUtils;
const context = TestUtils.mock('app');

test.before(() => {
  process.chdir(path.resolve(__dirname, '../../'));
});

test('Run transforms()', t => {
  context.options = {js: 'js'};
  context.copyTemplate('../../../test/assets/src/index.js', 'test/assets/src/index.js');
  context.destinationPath = path => path;
  const transforms = require('../../generators/app/transforms');
  transforms.apply(context);
  const result = context.copyTemplate['test/assets/src/index.js'];
  t.true(result.indexOf(`var Router = ReactRouter.Router;\nvar Route = ReactRouter.Route;\nvar browserHistory = ReactRouter.browserHistory;`) > -1);
  t.true(result.indexOf('var Router = ReactRouter.Router;') > -1);
  t.is(result.indexOf(`import 'app.js'`), -1);
  t.is(result.indexOf(`var app = require('app.js');`), -1);
  t.is(result.indexOf('export'), -1);
  t.true(result.indexOf('class Cmp extends React.Component') > -1);
  t.true(result.indexOf('var IndexStyles = {};') > -1);
  t.true(result.indexOf('style={IndexStyles.footer}') > -1);
});

test('Run transforms() when js is babel', t => {
  context.options = {js: 'babel'};
  context.copyTemplate('../../../test/assets/src/index.js', 'test/assets/src/index.js');
  context.destinationPath = path => path;
  const transforms = require('../../generators/app/transforms');
  transforms.apply(context);
  t.true(context.copyTemplate['test/assets/src/index.js'].indexOf('const Router = ReactRouter.Router;') > -1);
});

test('Run transforms() when js is typescript', t => {
  context.options = {js: 'typescript'};
  context.copyTemplate('../../../test/assets/src/index.js', 'test/assets/src/index.js');
  context.destinationPath = path => path;
  const transforms = require('../../generators/app/transforms');
  transforms.apply(context);
  t.true(context.copyTemplate['test/assets/src/index.js'].indexOf('const Router = ReactRouter.Router;') > -1);
});
