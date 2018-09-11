const { createTransformer } = require('babel-jest');

module.exports = createTransformer({
  configFile: './resources/babel/babel.config.js',
});
