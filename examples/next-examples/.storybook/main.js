const path = require('path');

const resolve = (p) => path.join(process.cwd(), '../..', p);

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-locale',
  ],
  framework: '@storybook/react',
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
