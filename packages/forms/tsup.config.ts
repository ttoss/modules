import type { Options } from 'tsup';

export const tsup: Options = {
  clean: true,
  dts: true,
  entryPoints: ['src/index.ts'],
  format: ['cjs', 'esm'],
  minify: true,
};
