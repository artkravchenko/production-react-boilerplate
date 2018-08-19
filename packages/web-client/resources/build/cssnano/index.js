const path = require('path');

function getCssnanoOptions() {
  return {
    configFile: path.join(__dirname, 'cssnano.config.js'),
  };
}

module.exports = {
  getCssnanoOptions,
};
