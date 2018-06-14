const path = require('path');
const webpack = require('webpack');

const merge = require('./utils/merge');

const context = path.join(__dirname, '../../../'),
  __DEV__ = process.env.NODE_ENV !== 'production';

const configuration = {
  context,

  entry: {
    app: './src/index.js',
  },

  mode: 'none',

  module: {
    noParse: path => {
      if (/react.*\.production\.min\.js$/.test(path)) {
        return false;
      }
      return /\.min\.js$/.test(path);
    },
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true,
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  plugins: [new webpack.NamedModulesPlugin()],

  target: 'web',
};

if (__DEV__) {
  merge(configuration, {
    bail: true,
    cache: true,
    devtool: 'eval',

    output: {
      chunkFilename: '[name].js',
      filename: 'assets/[name].js',
      path: path.join(context, 'build/public'),
      publicPath: '/',
    },
  });
}

module.exports = configuration;
