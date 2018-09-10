const path = require('path');

const toProjectRootPath = '../../../..';
const projectRootPath = path.join(__dirname, toProjectRootPath);

function getServerBabelConfig(options) {
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
    comments: true,
    ignore: [/node_modules\/(?!(shared|web-client))/],
    plugins: [
      'babel-plugin-transform-es2015-modules-commonjs',
      [
        'babel-plugin-universal-import',
        {
          babelServer: true,
        },
      ],
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-syntax-dynamic-import',
      [
        'babel-plugin-module-resolver',
        {
          root: [path.join(ctx, 'packages')],
        },
      ],
    ],
    presets: ['@babel/preset-react'],
  };
}

module.exports = {
  getServerBabelConfig,
};
