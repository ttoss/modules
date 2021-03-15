# ttoss Monorepo Template

Monorepo template used by [Triãngulos Tecnologia](https://triangulostecnologia.com) and ttoss projects.

## Features

- Eslint
- Commitlint
- Husky
- Jest
- Lint Staged
- NPM Check Updates
- Prettier
- Stylelint
- TypeScript

## Creating Packages

### E2E tests

```js
// ./e2e/jest.config.js
module.exports = require('../../../../config/jest.config.base')(
  process.cwd(),
  'e2e',
);
```
