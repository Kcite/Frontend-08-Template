'use strict';

const fountain = require('fountain-generator');
const transforms = require('./transforms');

module.exports = fountain.Base.extend({
  configuring: {
    pkg() {
      let dependencies;
      const devDependencies = {};

      this.updateJson('package.json', packageJson => {
        dependencies = packageJson.dependencies;
        delete packageJson.dependencies;
        return packageJson;
      });

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

      if (this.options.framework === 'angular1') {
        pkg.devDependencies['gulp-angular-filesort'] = '^1.1.1';
        devDependencies['angular-mocks'] = dependencies.angular;
      }

      if (this.options.js === 'typescript') {
        pkg.devDependencies['gulp-typescript'] = '^3.1.5';
      }

      this.mergeJson('package.json', pkg);

      if (this.options.framework === 'react') {
        delete dependencies['react-dom'];
      }

      this.mergeJson('bower.json', {
        name: 'fountain-inject',
        version: '0.0.1',
        dependencies,
        devDependencies
      });

      if (this.options.framework !== 'angular2' && this.options.sample === 'todoMVC') {
        this.mergeJson('bower.json', {
          overrides: {
            'todomvc-app-css': {
              main: 'index.css'
            }
          }
        });
      }
    }
  },

  writing: {
    transforms,

    gulp() {
      this.copyTemplate(
        this.templatePath('gulp_tasks'),
        this.destinationPath('gulp_tasks'),
        {css: this.options.css}
      );
    },

    indexHtml() {
      this.replaceInFileWithTemplate(
        this.templatePath('conf/gulp.conf.js'),
        this.destinationPath('conf/gulp.conf.js'),
        /$/
      );

      this.replaceInFileWithTemplate(
        'src/index-head.html',
        'src/index.html',
        /<\/head>/
      );
      this.replaceInFileWithTemplate(
        'src/index-footer.html',
        'src/index.html',
        /<\/html>/
      );
    }
  },

  install() {
    this.runInstall('./node_modules/.bin/bower');
  }
});
