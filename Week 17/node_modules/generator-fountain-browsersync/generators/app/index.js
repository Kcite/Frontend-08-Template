const fountain = require('fountain-generator');
const conf = require('./conf');

module.exports = fountain.Base.extend({
  configuring: {
    package() {
      const pkg = {
        devDependencies: {
          'browser-sync': '^2.18.8',
          'browser-sync-spa': '^1.0.3'
        }
      };

      this.mergeJson('package.json', pkg);
    },

    conf() {
      const templateVars = Object.assign({
        dist: false,
        webpackHotReload: this.options.framework === 'react' && this.options.modules === 'webpack'
      }, this.options);

      templateVars.browsersyncConf = conf(templateVars);
      this.copyTemplate('conf/browsersync.conf.js', 'conf/browsersync.conf.js', templateVars);

      templateVars.dist = true;
      templateVars.browsersyncConf = conf(templateVars);

      this.copyTemplate('conf/browsersync.conf.js', 'conf/browsersync-dist.conf.js', templateVars);
    }
  },

  writing() {
    this.copyTemplate(
      'gulp_tasks/browsersync.js',
      'gulp_tasks/browsersync.js',
      conf(this.options)
    );
  }
});
