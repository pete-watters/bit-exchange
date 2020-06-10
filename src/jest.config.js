module.exports = {
  clearMocks: true,
  collectCoverageFrom: ['src/**/*.{js}'],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js'],
  setupFiles: ['<rootDir>/enzyme.config.js'],
  testEnvironment: 'jsdom',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(test).js?(x)'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: false,
};