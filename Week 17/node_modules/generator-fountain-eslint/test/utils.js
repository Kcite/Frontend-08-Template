module.exports.base = {
  devDependencies: {
    'eslint': '^3.15.0',
    'eslint-config-xo-space': '^0.15.0'
  },
  eslintConfig: {
    root: true,
    env: {
      browser: true,
      jasmine: true
    }
  }
};

module.exports.vueBase = {
  devDependencies: {
    'babel-plugin-transform-object-rest-spread': '^6.23.0',
    'eslint-plugin-html': '^2.0.1',
    'babel-plugin-transform-runtime': '^6.23.0',
    'babel-runtime': '^6.23.0'
  },
  eslintConfig: {
    plugins: ['html']
  }
};

module.exports.reactBase = {
  devDependencies: {
    'babel-preset-react': '^6.23.0',
    'eslint-config-xo-react': '^0.10.0',
    'eslint-plugin-react': '^6.10.0'
  },
  eslintConfig: {
    extends: [
      'xo-react/space'
    ]
  }
};

module.exports.jsBase = {
  eslintConfig: {
    extends: [
      'xo-space'
    ]
  }
};

module.exports.angular1Base = {
  devDependencies: {
    'eslint-config-angular': '^0.5.0',
    'eslint-plugin-angular': '^1.6.1'
  }
};

module.exports.injectAngular1 = {
  eslintConfig: {
    globals: {
      angular: true
    }
  }
};

module.exports.babelBase = {
  devDependencies: {
    'babel-preset-es2015': '^6.22.0',
    'babel-core': '^6.23.1',
    'babel-polyfill': '^6.23.0'
  }
};

module.exports.angular2NotTypescriptBase = {
  eslintConfig: {
    rules: {
      'new-cap': 0
    }
  }
};

module.exports.systemjsAngular2 = {
  jspm: {
    devDependencies: {
      'babel-plugin-transform-es2015-typeof-symbol': 'npm:babel-plugin-transform-es2015-typeof-symbol@^6.23.0',
      'babel-plugin-angular2-annotations': 'npm:babel-plugin-angular2-annotations@^5.1.0',
      'babel-plugin-transform-decorators-legacy': 'npm:babel-plugin-transform-decorators-legacy@^1.3.4',
      'babel-plugin-transform-class-properties': 'npm:babel-plugin-transform-class-properties@^6.23.0',
      'babel-plugin-transform-flow-strip-types': 'npm:babel-plugin-transform-flow-strip-types@^6.22.0'
    }
  },
  eslintConfig: {
    globals: {
      __moduleName: true
    }
  }
};

module.exports.babelTypescriptBase = {
  devDependencies: {
    'babel-eslint': '^7.1.1',
    'eslint-plugin-babel': '^4.0.1'
  },
  eslintConfig: {
    parser: 'babel-eslint',
    extends: [
      'xo-space/esnext'
    ]
  }
};

module.exports.webpackBase = {
  devDependencies: {
    'eslint-loader': '^1.6.1',
    'babel-loader': '^6.3.2'
  }
};

module.exports.systemjsBase = {
  devDependencies: {
    'gulp-eslint': '^3.0.1'
  },
  eslintConfig: {
    globals: {
      SystemJS: true
    }
  }
};

module.exports.injectBase = {
  devDependencies: {
    'gulp-eslint': '^3.0.1'
  }
};

module.exports.systemjsReactBase = {
  jspm: {
    devDependencies: {
      'babel-preset-react': 'npm:babel-preset-react@^6.23.0'
    }
  }
};

module.exports.injectReactBase = {
  eslintConfig: {
    globals: {
      React: true,
      ReactDOM: true,
      axios: true
    },
    rules: {
      'react/jsx-no-undef': 0,
      'no-undef': 0,
      'no-unused-vars': 0
    }
  }
};
