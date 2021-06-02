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
 * Packages required by eslint-config-react-app/jest.
 *
 * - eslint-plugin-testing-library
 *
 * Packages required by eslint-plugin-prettier
 *
 * - eslint-config-prettier
 *
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    'jest/globals': true,
  },
  plugins: [
    '@typescript-eslint',
    'formatjs',
    'prettier',
    'jest',
    'jest-dom',
    'react-app',
    'plugin:jsx-a11y/recommended',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'jsx-a11y',
  ],
  rules: {
    'formatjs/no-offset': 'error',
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx'],
      rules: {
        '@typescript-eslint': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/camelcase': 'off',
      },
    },
  ],
};
