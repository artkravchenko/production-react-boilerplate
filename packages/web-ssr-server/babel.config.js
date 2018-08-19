// Putting babel's configuration to 'babel.config.js' instead of '.babelrc'
// enables babel-jest to transform JSX via @babel/preset-react:
// https://github.com/facebook/jest/issues/6229#issuecomment-403539460
module.exports = {
  ignore: ['/node_modules/(?!(shared|web-client))'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    'babel-plugin-transform-es2015-modules-commonjs',
  ],
  presets: ['@babel/preset-react'],
};
