import { DecoratorFn, Parameters } from '@storybook/react';
import { ThemeProvider } from '@ttoss/ui';

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ['Docs', '*'],
    },
  },
};

export const decorators: DecoratorFn[] = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
];
