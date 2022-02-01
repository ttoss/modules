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
    node: true,
  },
  plugins: [
    '@typescript-eslint',
    'formatjs',
    'prettier',
    'jest',
    'jest-dom',
    'jsx-a11y',
    'import',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': 'error',
    'formatjs/no-offset': 'error',
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    /**
     * https://stackoverflow.com/a/70546500/8786986
     */
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
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
