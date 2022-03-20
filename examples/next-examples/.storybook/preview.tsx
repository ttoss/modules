import { ThemeProvider } from '@ttoss/ui';
import { DecoratorFn } from '@storybook/react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators: DecoratorFn[] = [
  (Story) => {
    return (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    );
  },
];
