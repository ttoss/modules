import { createSerializer, matchers } from '@emotion/jest';
import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/react';
/**
 * https://react-hooks-testing-library.com/installation#being-specific
 */
import { renderHook } from '@testing-library/react-hooks/dom';
import * as React from 'react';

import './assignWindowProperties';

/**
 * Export all the matchers for Jest to avoid the error:
 * > Property 'toHaveStyleRule' does not exist on type 'JestMatchers<HTMLElement>'.
 */
export * from '@emotion/jest';

export { default as userEvent } from '@testing-library/user-event';

/**
 * Add the custom matchers provided by '@emotion/jest'
 * https://emotion.sh/docs/@emotion/jest#custom-matchers
 */
expect.extend(matchers);

/**
 * Output the actual styles being applied.
 * https://emotion.sh/docs/testing
 */
expect.addSnapshotSerializer(createSerializer());

/**
 * Custom render options.
 */
let options_: {
  wrapper?: any;
} = {};

export type { RenderOptions };

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { ...options_, ...options });

// eslint-disable-next-line import/export
export * from '@testing-library/react';

// eslint-disable-next-line import/export
export { customRender as render };

const customRenderHook: typeof renderHook = (callback, options) =>
  renderHook(callback, { ...options_, ...options });

export { customRenderHook as renderHook };

export const setOptions = (options: RenderOptions) => {
  options_ = options;
};

/**
 * Storybook
 */
export { default as initStoryshots } from '@storybook/addon-storyshots';
/**
 * This package needs `@storybook/client-api` package.
 */
export {
  composeStories,
  setGlobalConfig as setStorybookGlobalConfig,
  composeStory,
} from '@storybook/testing-react';
