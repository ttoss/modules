import * as React from 'react';

// https://storybook.js.org/docs/react/writing-stories/parameters#global-parameters
export const parameters = {
  // https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args
  actions: { argTypesRegex: '^on.*' },
};

import ModulesProvider from '../src/providers/ModulesProvider';

export const decorators = [
  Story => (
    <ModulesProvider>
      <Story />
    </ModulesProvider>
  ),
];
