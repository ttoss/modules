import { tsupConfig } from '@ttoss/config';

export const tsup = tsupConfig({
  minify: false,
  inject: ['./tsup.inject.js'],
});
