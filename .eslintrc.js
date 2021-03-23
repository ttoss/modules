/**
 * Packages required by eslint-config-react-app.
 *
 * - @typescript-eslint/eslint-plugin
 * - @typescript-eslint/parser
 * - babel-eslint
 * - eslint-plugin-import
 * - eslint-plugin-flowtype
 * - eslint-plugin-jsx-a11y
 * - eslint-plugin-react-hooks
 * - eslint-plugin-react
 *
 * Packages required by eslint-plugin-prettier
 *
 * - eslint-config-prettier
 *
 */
module.exports = {
  plugins: ['formatjs', 'prettier'],
  extends: ['plugin:prettier/recommended'],
  rules: {
    'formatjs/no-offset': 'error',
  },
};
