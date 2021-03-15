module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // Too slow when using project
    // "project": "./tsconfig.base.json"
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    browser: true,
    'jest/globals': true,
  },
  plugins: ['@typescript-eslint', 'jest', 'prettier'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Annoying to force return type.
    '@typescript-eslint/explicit-function-return-type': 'off', // Annoying to force return type.
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    'import/extensions': 'off', // TODO: remove some day. ES modules don't import without extensions
    'import/no-unresolved': 'off', // Remove error when importing Yarn Workspace modules.
    'import/no-extraneous-dependencies': 'off', // Remove error when importing Yarn Workspace modules.
    'import/prefer-default-export': 'off', // Allow single Named-export.
    'no-console': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto', // https://stackoverflow.com/questions/53516594/why-do-i-keep-getting-delete-cr-prettier-prettier
      },
    ],
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
