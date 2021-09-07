import { tsupConfig, defaultConfig } from './tsup';

test('should return default configuration', () => {
  expect(tsupConfig()).toEqual(defaultConfig);
});

test('should return default configuration', () => {
  expect(
    tsupConfig({
      entryPoints: ['src/index.tsx'],
    })
  ).toEqual({ ...defaultConfig, entryPoints: ['src/index.tsx'] });
});
