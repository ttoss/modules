import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/react';

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

/**
 * Create custom render function with options.
 */
let wrapper: RenderOptions['wrapper'];

export const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper, ...options });

export const setWrapper = (newWrapper: RenderOptions['wrapper']) => {
  wrapper = newWrapper;
};
