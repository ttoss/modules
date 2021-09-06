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
 * Custom render options.
 */
let options_: RenderOptions = {};

export const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { ...options_, ...options });

export const setOptions = (options: RenderOptions) => {
  options_ = options;
};
