const mergeWith = require('lodash/mergeWith');

function concatArrays(a, b) {
  if (!Array.isArray(a)) {
    return undefined;
  }

  return a.concat(b);
}

function mergeWithConcat() {
  return mergeWith(...arguments, concatArrays);
}

module.exports = mergeWithConcat;
