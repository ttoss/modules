/**
 * - TypeScript: https://github.com/typescript-eslint/typescript-eslint
 * - Jest: https://github.com/jest-community/eslint-plugin-jest
 * - Prettier: https://github.com/prettier/eslint-config-prettier
 * - Format.JS: https://formatjs.io/docs/tooling/linter
 * - React: https://github.com/yannickcr/eslint-plugin-react
 * - React Hooks: https://www.npmjs.com/package/eslint-plugin-react-hooks
 * - jsx-a11y: https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    'jest/globals': true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['@typescript-eslint', 'jest', 'formatjs', 'react', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  rules: {
    'formatjs/no-offset': 'error',
    'no-console': 'error',
    'sort-imports': 'error',
  },
};
