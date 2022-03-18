import { prettierConfig, defaultConfig } from './prettier';

test('should return default configuration', () => {
  expect(prettierConfig()).toEqual(defaultConfig);
});

test('should return default configuration', () => {
  expect(
    prettierConfig({
      printWidth: 100,
    })
  ).toEqual({ ...defaultConfig, printWidth: 100 });
});
