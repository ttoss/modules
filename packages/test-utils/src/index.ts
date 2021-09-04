import { matchers } from '@emotion/jest';
import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/react';

/**
 * Export all the matchers for Jest to avoid the error:
 * > Property 'toHaveStyleRule' does not exist on type 'JestMatchers<HTMLElement>'.
 */
export * from '@emotion/jest';

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

/**
 * Add the custom matchers provided by '@emotion/jest'
 * https://emotion.sh/docs/@emotion/jest#custom-matchers
 */
expect.extend(matchers);

/**
 * Create custom render function with options.
 */
let wrapper: RenderOptions['wrapper'];

export const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper, ...options });

export const setWrapper = (newWrapper: RenderOptions['wrapper']) => {
  wrapper = newWrapper;
};
