import { configCreator } from './configCreator';

const defaultOptions: any = {
  presets: [
    /**
     * `loose: true` to avoid the Storybook warning:
     *
     * > Though the "loose" option was set to "false" in your @babel/preset-env
     * > config, it will not be used for @babel/plugin-proposal-private-property-in-object
     * > since the "loose" mode option was set to "true"
     * > for @babel/plugin-proposal-private-methods.
     */
    ['@babel/preset-env', { loose: true, targets: { node: 'current' } }],
    '@babel/preset-typescript',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ],
};

export const babelConfig = configCreator(defaultOptions);
