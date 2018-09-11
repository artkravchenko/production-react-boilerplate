const { without } = require('lodash');
const path = require('path');
const webpack = require('webpack');

const packageConfiguration = require('web-client/package.json');

const dependencies = Object.keys(packageConfiguration.dependencies);

const context = path.join(__dirname, '../../../');

const blackList = [
  // keeping inside vendor.js bundle, causes universal components
  // to be at the loading state first at the client-side
  'react-universal-component',
];

const webClientVendorConfiguration = {
  context,

  entry: {
    vendor: without(dependencies, ...blackList),
  },

  output: {
    filename: 'public/assets/[name].js',
    library: '[name]',
    libraryTarget: 'var',
    path: path.join(context, 'build'),
  },

  mode: 'none',

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DllPlugin({
      context,
      name: '[name]',
      path: path.join(context, 'build/webpack/[name]-manifest.json'),
    }),
  ],

  target: 'web',
};

module.exports = webClientVendorConfiguration;
