// Putting babel's configuration to 'babel.config.js' instead of '.babelrc'
// enables babel-jest to transform JSX via @babel/preset-react:
// https://github.com/facebook/jest/issues/6229#issuecomment-403539460
const { getServerBabelConfig } = require('./server');

const babelConfig = getServerBabelConfig();

module.exports = babelConfig;
