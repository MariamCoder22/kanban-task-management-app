const jestPreset = require('jest-preset-angular/jest-preset');
const { globals } = jestPreset;
const tsjest = globals['ts-jest'];

const tsjestOverrides = {
  ...tsjest,
  tsconfig: '<rootDir>/tsconfig.spec.json'
};

const globalOverrides = {
  ...globals,
  'ts-jest': { ...tsjestOverrides }
};

module.exports = {
  ...jestPreset,
  globals: { ...globalOverrides },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setupJest.ts']
};
