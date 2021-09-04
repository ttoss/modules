import type { Options } from 'tsup';

export const tsup: Options = {
  clean: true,
  dts: true,
  entryPoints: ['src/index.ts', 'src/storybook.ts'],
  format: ['cjs', 'esm'],
};
