import ThemeProvider from '../src/theme/ThemeProvider';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  argTypes: {
    value: { control: { type: 'text' } },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={{}}>
      <Story />
    </ThemeProvider>
  ),
];
