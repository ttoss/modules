module.exports = {
  stories: ['../**/*.stories.@(ts|tsx|js|jsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    /**
     * @todo Remove this config @see https://github.com/storybookjs/storybook/issues/15067
     */
    reactDocgen: 'none',
  },
};
