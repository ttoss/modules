import type { Options } from 'tsup';

import { configCreator } from './configCreator';

export const tsupDefaultOptions: Options = {
  clean: true,
  dts: true,
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm'],
  /**
   * legacyOutput `true` because some libraries don't support `.mjs`.
   */
  legacyOutput: true,
  minify: true,
};

export const tsupConfig = configCreator(tsupDefaultOptions);
