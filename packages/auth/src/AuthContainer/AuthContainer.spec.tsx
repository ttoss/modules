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
