import {
  composeStories,
  customRender,
  render,
  screen,
  userEvent,
} from '@ttoss/test-utils';

import Component from '.';
import * as stories from './index.stories';

const { Example } = composeStories(stories);

test('check if the jest.setup.tsx added the JestSetupProvider', () => {
  customRender(<Component />);

  expect(screen.getByText('JestSetupProvider')).toBeInTheDocument();
});

test("check if JestSetupProvider is not present because we're using `render`", () => {
  render(<Component />);

  expect(screen.queryByText('JestSetupProvider')).not.toBeInTheDocument();
});

test('check if the setup added the button', () => {
  customRender(<Component />);

  expect(screen.getByText('oi')).toBeInTheDocument();
  expect(screen.getByText(0)).toBeInTheDocument();
  expect(screen.getByText('Increment')).toBeInTheDocument();
});

test('check user event', () => {
  customRender(<Component />);

  userEvent.click(screen.getByText('Increment'));

  expect(screen.getByText(1)).toBeInTheDocument();
});

test('check if Storybook Example story is working', () => {
  customRender(<Example />);

  expect(screen.getByText('oi')).toBeInTheDocument();
  expect(screen.getByText(0)).toBeInTheDocument();
  expect(screen.getByText('Increment')).toBeInTheDocument();
  expect(screen.getByText('StorybookDecorator')).toBeInTheDocument();
  expect(screen.getByText('JestSetupProvider')).toBeInTheDocument();

  userEvent.click(screen.getByText('Increment'));

  expect(screen.getByText(1)).toBeInTheDocument();
});
