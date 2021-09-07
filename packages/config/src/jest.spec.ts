import { jestConfig, defaultConfig } from './jest';

test('should return default config', () => {
  expect(jestConfig()).toEqual(defaultConfig);
});
