import { babelConfig, defaultConfig } from './babel';

test('should return default config', () => {
  expect(babelConfig()).toEqual(defaultConfig);
});

test('should update plugin', () => {
  expect(babelConfig({ plugins: ['relay'] })).toEqual({
    ...defaultConfig,
    plugins: ['relay'],
  });
});
