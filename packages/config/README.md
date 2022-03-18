# @ttoss/config

<strong>@ttoss/config</strong> is a very opinionated configuration library for monorepo repositories, packages, and applications. It contains a set of default configuration methods that you can use to configure your projects.

Each configuration is customizable and you can extend them with your own. For example, you can use the default `.prettierrc.js` file in your monorepo:

```js title=".prettierrc.js"
const { prettierConfig } = require('@ttoss/config');

module.exports = prettierConfig();
```

But, if you want to change the `printWidth` [option](https://prettier.io/docs/en/options.html), you can do so:

```js title=".prettierrc.js"
const { prettierConfig } = require('@ttoss/config');

module.exports = prettierConfig({
  printWidth: 120,
});
```

## Install

```shell
$ yarn add -DW @ttoss/config
```

## Monorepo

### Eslint and Prettier

Install the following packages on the root of your monorepo:

```shell
yarn add -DW eslint prettier
```

Create `.prettierrc.js`:

```js title=".prettierrc.js"
const { prettierConfig } = require('@ttoss/config');

module.exports = prettierConfig();
```

### Husky, commitlint, and lint-staged

This group of packages will only work if you have already installed [Eslint and Prettier](#eslint-and-prettier).

Install the following packages on the root of your monorepo:

```shell
yarn add -DW husky @commitlint/cli lint-staged
```

Create `.commitlintrc.js`:

```js title=".commitlintrc.js"
const { commitlintConfig } = require('@ttoss/config');

module.exports = commitlintConfig();
```

Create `.lintstagedrc.js`:

```js title=".lintstagedrc.js"
const { lintstagedConfig } = require('@ttoss/config');

module.exports = lintstagedConfig();
```

Finally, configure Husky:

```shell
yarn set-script prepare "husky install"
yarn run prepare
yarn husky add .husky/commit-msg "yarn commitlint --edit"
yarn husky add .husky/pre-commit "yarn lint-staged"
```

## Packages and Applications

### Babel

Add `babel.config.js` to each package:

```js title="babel.config.js"
const { babelConfig } = require('@ttoss/config');

module.exports = babelConfig();
```

### Jest

Install [Jest](https://jestjs.io/) and its types on the root of your monorepo (or package):

```shell
yarn add -DW jest @types/jest
```

Create `jest.config.ts` for each package:

```ts title="jest.config.ts"
import { jestConfig } from '@ttoss/config';

const config = jestConfig();

export default config;
```

Configure the `test` script on `package.json`:

```json title="package.json'
"scripts: {
  test: 'jest',
}
```

### Tsup

Use [tsup](https://tsup.egoist.sh/) to bundle your TypeScript package, if you need to.

Install [tsup](https://tsup.egoist.sh/) on the root of your monorepo (or package):

```shell
yarn add -DW tsup
```

Create `tsup.config.ts` for each package:

```ts title="tsup.config.ts"
import { tsupConfig } from '@ttoss/config';

export const tsup = tsupConfig();
```

Configure the `build` script on `package.json`:

```json title="package.json'
"scripts: {
  build: 'tsup',
}
```

### TypeScript

Install [TypeScript](https://www.npmjs.com/package/typescript) on the root of your monorepo (or package):

```shell
yarn add -DW typescript
```

Extend default configuration for each `tsconfig.json` of the packages:

```json title="tsconfig.json"
{
  "extends": "@ttoss/config/tsconfig.json"
}
```
