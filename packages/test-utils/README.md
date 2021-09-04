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

#### customRender

`customRender` is a method that allows you to render a React component with a provided wrapper. Before using it, you need to setup the testing framework before each test.

```tsx
// jest.setup.ts
import { setWrapper } from '@ttoss/test-utils';

import AllProviders from './paht/to/AllProviders';

/**
 * Add global wrapper to React Testing Library `customRender`.
 */
setWrapper(AllProviders);
```

Add `jest.setup.ts` to your `jest.config.js` file.

```ts
export default {
  // ...
  setupFilesAfterEnv: ['./jest.setup.tsx'],
};
```

Finally, you write your tests something like this:

```tsx
import { customRender, render, screen, userEvent } from '@ttoss/test-utils';

import Component from './Component';

test('test with custom render', () => {
  customRender(<Component />);

  userEvent.click(screen.getByText('Increment'));

  expect(screen.getByText(1)).toBeInTheDocument();
});

test('test with default render', () => {
  render(<Component />);

  userEvent.click(screen.getByText('Increment'));

  expect(screen.getByText(1)).toBeInTheDocument();
});
```

### Storybook

You can use your Storybook stories in your unit tests or create Storyshoots testing.

#### Storybook Stories

You can reuse the Storybook stories that you've already created in your unit tests. To do so, this packages uses the package [@storybook/testing-react](https://github.com/storybookjs/testing-react), that you can use this way:

```tsx
import { customRender, screen, userEvent } from '@ttoss/test-utils';
import { composeStories } from '@ttoss/test-utils/storybook';

import * as stories from './my.stories';

const { Example } = composeStories(stories);

test('check if Storybook Example story is working', () => {
  customRender(<Example />);

  expect(screen.getByText('oi')).toBeInTheDocument();
  expect(screen.getByText(0)).toBeInTheDocument();
  expect(screen.getByText('Increment')).toBeInTheDocument();
  expect(screen.getByText('StorybookDecorator')).toBeInTheDocument();
  expect(screen.getByText('JestSetupProvider')).toBeInTheDocument();

  userEvent.click(screen.getByText('Increment'));

  expect(screen.getByText(1)).toBeInTheDocument();
});
```

If your Storybook configuration has global decorators/parameters/etc and you want to use them in your tests, you can use the `setGlobalConfig` function to pass them to your stories. In your `jest.setup.ts` file, you can use the `setGlobalConfig` this way:

```tsx
// jest.setup.ts
import { setGlobalConfig } from '@ttoss/test-utils/storybook';

/**
 * Add global config to Storybook.
 * https://storybook.js.org/addons/@storybook/testing-react
 */
import * as globalStorybookConfig from './.storybook/preview';

setGlobalConfig(globalStorybookConfig);
```

#### Storyshoots
