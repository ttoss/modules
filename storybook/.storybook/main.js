const path = require('path');

/**
 * Point to root node_modules.
 */
const resolve = (p) => path.join(process.cwd(), '..', p);

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  /**
   * https://github.com/system-ui/theme-ui/issues/354
   */
  webpackFinal(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@emotion/core': resolve('node_modules/@emotion/react'),
      '@emotion/styled': resolve('node_modules/@emotion/styled'),
      'emotion-theming': resolve('node_modules/@emotion/react'),
    };
    return config;
  },
};
