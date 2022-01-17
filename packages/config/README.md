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

```js title="jest.config.js"
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

```js title="tsup.config.js"
import { tsupConfig } from '@ttoss/config';

export const tsup = tsupConfig();
```

## 📘 Types

```ts
const babelConfig: () => any;

const jestConfig: () => any;

const tsupConfig: () => any;
```
