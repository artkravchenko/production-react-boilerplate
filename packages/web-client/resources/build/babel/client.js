const path = require('path');

const toProjectRootPath = '../../../../..';
const projectRootPath = path.join(__dirname, toProjectRootPath);

function getClientBabelConfig(options) {
  if (!options) {
    options = {};
  }

  let ctx;

  if (options.context) {
    ctx = path.relative(options.context, projectRootPath);
  } else {
    ctx = toProjectRootPath;
  }

  return {
    babelrc: false,
    plugins: [
      'babel-plugin-universal-import',
      'react-hot-loader/babel',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      [
        'babel-plugin-module-resolver',
        {
          root: [path.join(ctx, 'packages')],
        },
      ],
    ],
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,
          modules: false,
          targets: {
            browsers: [
              'last 2 versions',
              'last 4 years',
              'Chrome >= 54',
              'ChromeAndroid >= 54',
              'IE >= 11',
              'Edge >= 15',
              'iOS >= 9',
              'Safari >= 10',
            ],
          },
          useBuiltIns: 'usage',
        },
      ],
      '@babel/preset-react',
    ],
  };
}

module.exports = {
  getClientBabelConfig,
};
