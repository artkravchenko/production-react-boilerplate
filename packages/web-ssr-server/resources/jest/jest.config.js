module.exports = {
  collectCoverage: true,
  coverageDirectory: './resources/jest/coverage',
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/../shared/__mocks__/style.js',
  },
  rootDir: '../../',
  setupTestFrameworkScriptFile: './resources/jest/init.js',
  transform: {
    '^.+\\.jsx?$': './resources/jest/babel-transform',
  },
  transformIgnorePatterns: ['/node_modules/(?!(shared|web-client))'],
};
