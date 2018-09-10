function getServerBabelConfig() {
  return {
    babelrc: false,
    comments: true,
    ignore: [/node_modules\/(?!(shared|web-client))/],
    plugins: [
      'babel-plugin-transform-es2015-modules-commonjs',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
    ],
    presets: ['@babel/preset-react'],
  };
}

module.exports = {
  getServerBabelConfig,
};
