const ExtractCssChunksWebpackPlugin = require('extract-css-chunks-webpack-plugin');
const path = require('path');
const StatsWebpackPlugin = require('stats-webpack-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const defaults = require('shared/src/features/env/defaults');
const { createSubenv } = require('shared/src/features/env/sub');

const { getClientBabelConfig } = require('../babel/client');
const { getBrowserslist } = require('../browserslist');
const merge = require('./utils/merge');

const context = path.join(__dirname, '../../../'),
  assetsPath = path.join(context, 'build/public/assets'),
  __DEV__ = process.env.NODE_ENV !== 'production';

const subenv = createSubenv(defaults);

function getEntry() {
  if (process.env.WEBPACK_ENABLE_HMR === '1') {
    return [
      'webpack-hot-middleware/client?reload=true&timeout=2000',
      './src/index.js',
    ];
  }

  return ['./src/index.js'];
}

function getPostCssLoader() {
  const defaultOptions = {
    config: {
      path: path.join(context, 'resources/build/postcss'),
    },
    plugins: [],
  };

  if (__DEV__) {
    return {
      loader: 'postcss-loader',
      options: {
        ...defaultOptions,
        plugins: [
          ...defaultOptions.plugins,
          require('postcss-preset-env')({
            browsers: getBrowserslist({ mode: 'development' }),
          }),
        ],
        sourceMap: true,
      },
    };
  }

  return {
    loader: 'postcss-loader',
    options: {
      ...defaultOptions,
      plugins: [
        ...defaultOptions.plugins,
        require('postcss-preset-env')({
          browsers: getBrowserslist({ mode: 'production' }),
        }),
      ],
    },
  };
}

function getWebpackStatsPath() {
  let statsPath = subenv(process.env.WEBPACK_CLIENT_STATS_PATH);

  if (!statsPath) {
    statsPath = path.join(context, './build/webpack/app-stats.json');
  }

  return path.relative(assetsPath, statsPath);
}

const configuration = {
  bail: true,
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
    path: assetsPath,
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
    cache: true,
    devtool: 'eval',

    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            ExtractCssChunksWebpackPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
              },
            },
            getPostCssLoader(),
          ],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            ExtractCssChunksWebpackPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: true,
              },
            },
            getPostCssLoader(),
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },

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

      new ExtractCssChunksWebpackPlugin({
        filename: '[name].css',
        hot: true,
      }),

      process.env.WEBPACK_ENABLE_HMR === '1'
        ? new webpack.HotModuleReplacementPlugin()
        : null,
    ].filter(truthy),
  });
} else {
  merge(configuration, {
    output: {
      chunkFilename: '[name].[chunkhash].js',
      filename: '[name].[chunkhash].js',
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            ExtractCssChunksWebpackPlugin.loader,
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
            getPostCssLoader(),
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            ExtractCssChunksWebpackPlugin.loader,
            {
              loader: 'css-loader',
              options: { importLoaders: 2 },
            },
            getPostCssLoader(),
            'sass-loader',
          ],
        },
      ],
    },

    optimization: {
      minimize: true,
      minimizer: [
        new UglifyJsWebpackPlugin({
          cache: true,
          exclude: [/\.min\.js$/gi],
          parallel: true,
          uglifyOptions: {
            compress: {
              unsafe: true,
              unsafe_comps: true,
            },
            ie8: false,
            output: {
              comments: false,
            },
            safari10: true,
            toplevel: true,
            warnings: false,
          },
        }),
      ],
    },

    plugins: [
      new ExtractCssChunksWebpackPlugin({
        filename: '[name].[chunkhash].css',
        hot: false,
      }),

      new StatsWebpackPlugin(getWebpackStatsPath()),
    ],
  });
}

module.exports = configuration;
