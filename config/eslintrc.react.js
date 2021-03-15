const path = require('path');

module.exports = {
  plugins: ['react-hooks', 'relay', 'jest-dom'],
  extends: [
    'airbnb',
    'react-app',
    'react-app/jest',
    'plugin:relay/recommended', // https://twitter.com/sseraphini/status/1341730109796085762
    path.resolve(__dirname, 'eslintrc.base.js'),
  ],
  rules: {
    '@typescript-eslint/no-use-before-define': 'off',
    'no-use-before-define': 'off',
    'no-console': 'error',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.tsx'], // Also want to use with ".tsx".
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-wrap-multilines': 'off', // This rule conflicts with prettier/prettier.
    'react/prop-types': 'off', // Is this incompatible with TS props type?
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off', // Problems with function components.
    'react-hooks/rules-of-hooks': 'error',
    'relay/generated-flow-types': 'off',
  },
};
