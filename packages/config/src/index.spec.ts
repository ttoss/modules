import { tsupConfig, tsupDefaultOptions } from './tsup';

describe('tsupConfig', () => {
  test('should return default configuration', () => {
    expect(tsupConfig()).toEqual(tsupDefaultOptions);
  });

  test('should return default configuration', () => {
    expect(
      tsupConfig({
        entryPoints: ['src/index.tsx'],
      })
    ).toEqual({ ...tsupDefaultOptions, entryPoints: ['src/index.tsx'] });
  });
});
