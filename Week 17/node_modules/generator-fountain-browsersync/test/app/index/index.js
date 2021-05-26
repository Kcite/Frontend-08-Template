const path = require('path');
const test = require('ava');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);
const TestUtils = require('fountain-generator').TestUtils;

let context;

test.before(() => {
  context = TestUtils.mock('app');
  require('../../../generators/app/index');
  process.chdir(path.resolve(__dirname, '../../../'));
});

test(`Add 'browser-sync' and 'browser-sync-spa' to package.json devDependencies`, t => {
  TestUtils.call(context, 'configuring.package');
  t.is(context.mergeJson['package.json'].devDependencies['browser-sync'], '^2.18.8');
  t.is(context.mergeJson['package.json'].devDependencies['browser-sync-spa'], '^1.0.3');
});

test(`Call 'copyTemplate' twice and copy the files`, t => {
  const spy = chai.spy.on(context, 'copyTemplate');
  TestUtils.call(context, 'configuring.conf');
  expect(spy).to.have.been.called.twice();
  t.true(context.copyTemplate['conf/browsersync.conf.js'].length > 0);
  t.true(context.copyTemplate['conf/browsersync-dist.conf.js'].length > 0);
});

test('Copy browsersync.js', t => {
  TestUtils.call(context, 'writing');
  t.true(context.copyTemplate['gulp_tasks/browsersync.js'].length > 0);
});
