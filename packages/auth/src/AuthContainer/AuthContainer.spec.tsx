import { render } from '@ttoss/test-utils';

import { AuthContainer } from './AuthContainer';

test('default background', () => {
  const { container } = render(<AuthContainer />);

  expect(container).toMatchSnapshot();
});

test('image background', () => {
  const { container } = render(
    <AuthContainer backgroundImageUrl="https://source.unsplash.com/random" />
  );

  expect(container).toMatchSnapshot();
});

test('default background on mobile', () => {
  jest.spyOn(window, 'matchMedia').mockImplementation(() => {
    return { matches: false } as any;
  });

  const { container } = render(
    <AuthContainer backgroundImageUrl="https://source.unsplash.com/random" />
  );

  expect(container).toMatchSnapshot();
});
