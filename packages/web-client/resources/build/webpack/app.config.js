const path = require('path');
const webpack = require('webpack');

const { getClientBabelConfig } = require('../babel/client');
const merge = require('./utils/merge');

const context = path.join(__dirname, '../../../'),
  __DEV__ = process.env.NODE_ENV !== 'production';

function getEntry() {
  if (process.env.WEBPACK_ENABLE_HMR === '1') {
    return [
      'webpack-hot-middleware/client?reload=true&timeout=2000',
      './src/index.js',
    ];
  }

  return ['./src/index.js'];
}

const configuration = {
  context,

  entry: {
    app: getEntry(),
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
            cacheDirectory: true,
            ...getClientBabelConfig(),
          },
        },
      },
    ],
  },

  optimization: {
    runtimeChunk: {
      name: 'manifest',
    },
  },

  output: {
    path: path.join(context, 'build/public/assets'),
    publicPath: '/assets/',
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    new webpack.EnvironmentPlugin({
      SSR_ENABLED: null,
    }),
  ],

  target: 'web',
};

function truthy(x) {
  return x;
}

if (__DEV__) {
  merge(configuration, {
    bail: true,
    cache: true,
    devtool: 'eval',

    output: {
      chunkFilename: '[name].js',
      filename: '[name].js',
    },

    plugins: [
      new webpack.DllReferencePlugin({
        context,
        manifest: path.join(context, 'build/webpack/vendor-manifest.json'),
        name: 'vendor',
      }),

      process.env.WEBPACK_ENABLE_HMR === '1'
        ? new webpack.HotModuleReplacementPlugin()
        : null,
    ].filter(truthy),
  });
}

module.exports = configuration;
