import { commitlintConfig, defaultConfig } from './commitlint';

test('should return default configuration', () => {
  expect(commitlintConfig()).toEqual(defaultConfig);
});

test('should return default configuration', () => {
  expect(
    commitlintConfig({
      extends: ['other-config'],
    })
  ).toEqual({ ...defaultConfig, extends: ['other-config'] });
});
