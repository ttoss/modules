import { matchers } from '@emotion/jest';
import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/react';

/**
 * Export all the matchers for Jest to avoid the error:
 * > Property 'toHaveStyleRule' does not exist on type 'JestMatchers<HTMLElement>'.
 */
export * from '@emotion/jest';

export * from '@testing-library/react';
export {
  renderHook,
  /**
   * DEPRECATED: use `act` instead.
   */
  act as renderHookAct,
} from '@testing-library/react-hooks';
export { default as userEvent } from '@testing-library/user-event';

/**
 * Add the custom matchers provided by '@emotion/jest'
 * https://emotion.sh/docs/@emotion/jest#custom-matchers
 */
expect.extend(matchers);

/**
 * Custom render options.
 */
let options_: RenderOptions = {};

export const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { ...options_, ...options });

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
