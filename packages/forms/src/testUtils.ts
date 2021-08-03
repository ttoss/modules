import '@testing-library/jest-dom';
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ProvidersUtils from './ProvidersUtils';

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: ProvidersUtils, ...options });

export * from '@testing-library/react';

export { customRender as render, userEvent };
