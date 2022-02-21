import { tsupConfig } from '@ttoss/config';

export const tsup = tsupConfig({
  entryPoints: ['src/index.ts', 'cloud/index.ts'],
  minify: false,
  inject: ['./tsup.inject.js'],
});
