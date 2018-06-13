module.exports = {
  collectCoverage: true,
  coverageDirectory: './resources/jest/coverage',
  rootDir: '../../',
  setupTestFrameworkScriptFile: './resources/jest/init.js',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
