import { babelConfig, defaultConfig } from './babel';

test('should return default config', () => {
  expect(babelConfig()).toEqual(defaultConfig);
});
