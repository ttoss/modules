import deepmerge from 'deepmerge';

const overwriteMerge = (_: any, sourceArray: any) => sourceArray;

export const configCreator =
  <T extends Record<string, any>>(defaultConfig: T = {} as T) =>
  (config: T = {} as T) =>
    deepmerge<T>(defaultConfig, config, { arrayMerge: overwriteMerge });
