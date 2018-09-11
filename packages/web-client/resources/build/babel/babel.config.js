const path = require('path');

const { getClientBabelConfig } = require('./client');

const packageRootPath = path.join(__dirname, '../../..');

const babelConfig = getClientBabelConfig({
  context: packageRootPath,
});

module.exports = babelConfig;
