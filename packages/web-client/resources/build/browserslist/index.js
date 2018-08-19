const DEVELOPMENT = ['Chrome >= 67'];

const PRODUCTION = [
  'last 2 versions',
  'last 4 years',
  'Chrome >= 54',
  'ChromeAndroid >= 54',
  'IE >= 11',
  'Edge >= 15',
  'Firefox >= 51',
  'iOS >= 9',
  'Safari >= 10',
];

const NONE = [];

/**
 * @param {Object} options
 * @param {String} options.mode
 */
function getBrowserslist(options) {
  switch (options.mode) {
    case 'development': {
      return DEVELOPMENT;
    }

    case 'production': {
      return PRODUCTION;
    }

    default: {
      return NONE;
    }
  }
}

module.exports = {
  getBrowserslist,
};
