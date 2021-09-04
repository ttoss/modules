# @ttoss/test-utils

This package provides a number of utilities and re-exports for testing using [Jest](https://jestjs.io/), [React Testing Library](https://testing-library.com/docs/react-testing-library/intro), and [Storybook](https://storybook.js.org/).

## How to Configure Your Project

You can configure your project following the instructions in the [Jest](https://jestjs.io/) documentation. Basically, you need to add jest to your project, `yarn add --dev jest` and run `npx jest --init`. After that, a configuration file will be created in your project root. If you're working with React, you'll need to change the property `testEnvironment` to `jsdom`.

```ts
// jest.config.ts
export default {
  // ...
  testEnvironment: 'jsdom',
};
```

If you're working with TypeScript, you'll need to install [Babel](https://jestjs.io/docs/getting-started#using-babel) and create a `babel.config.js` to handle the transpilation of the ES6 code, TypeScript, and JSX.

```sh
yarn add --dev babel-jest @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript
```

```js
// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    /**
     * Adding this line allows you to use JSX in your files without using
     * `import React as 'react'`.
     */
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
};
```

## Installing the Package

```sh
yarn add --dev @ttoss/test-utils
```

## Using the Package

_You can see an example of the package on this [GitHub repository]()._

### React

This package re-exports the following libraries:

- [@testing-library/jest-dom](https://github.com/testing-library/jest-dom): custom [Jest](https://jestjs.io/) matchers to test the state of the DOM.
- Everything from [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/): APIs for working with React components.
- `userEvent` from [@testing-library/user-event](https://testing-library.com/docs/ecosystem-user-event/): fire events the same way the user does.

### Storybook
