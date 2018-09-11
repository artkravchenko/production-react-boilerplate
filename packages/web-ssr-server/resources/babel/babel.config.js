// Putting babel's configuration to 'babel.config.js' instead of '.babelrc'
// enables babel-jest to transform JSX via @babel/preset-react:
// https://github.com/facebook/jest/issues/6229#issuecomment-403539460
const path = require('path');

const { getServerBabelConfig } = require('./server');

const packageRootPath = path.join(__dirname, '../..');

const babelConfig = getServerBabelConfig({
  context: packageRootPath,
});

module.exports = babelConfig;
