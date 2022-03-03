# @ttoss/config

## 📚 About

<strong> @ttoss/config</strong> is a easiest way to use Configs in your React application.

## 🚀 Get Started

### Install

```shell
$ yarn add @ttoss/config
# or
$ npm install @ttoss/config
```

## 📄 Examples of use

### Babel

```js title="babel.config.js"
const { babelConfig } = require('@ttoss/config');

module.exports = babelConfig();
```

### Jest

```ts title="jest.config.ts"
import { jestConfig } from '@ttoss/config';

const config = jestConfig({
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['./jest.setup.tsx'],
  testEnvironment: 'jsdom',
});

export default config;
```

### Tsup

```ts title="tsup.config.ts"
import { tsupConfig } from '@ttoss/config';

export const tsup = tsupConfig();
```

### TypeScript

```json title="tsconfig.json"
{
  "extends": "@ttoss/config/tsconfig.json"
}
```
