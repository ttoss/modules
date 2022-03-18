import { lintstagedConfig, defaultConfig } from './lintstaged';

test('should return default configuration', () => {
  expect(lintstagedConfig()).toEqual(defaultConfig);
});

test('should return default configuration', () => {
  expect(
    lintstagedConfig({
      '.js': 'eslint --fix',
    })
  ).toEqual({ ...defaultConfig, '.js': 'eslint --fix' });
});
