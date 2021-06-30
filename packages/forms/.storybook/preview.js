import * as React from 'react';

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
};

import ProvidersUtils from '../src/ProvidersUtils';

export const decorators = [
  (Story) => (
    <ProvidersUtils>
      <Story />
    </ProvidersUtils>
  ),
];
