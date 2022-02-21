import { render, screen } from '@ttoss/test-utils';

import { AuthCard, LogoProvider } from './AuthCard';

test('render AuthCard with logo', () => {
  const children = 'children';
  const logo = 'logo';
  const buttonLabel = 'button label';
  const link1 = 'link1';
  const link2 = 'link2';

  const onClick = jest.fn();

  render(
    <LogoProvider logo={logo}>
      <AuthCard
        {...{
          buttonLabel,
          links: [
            {
              onClick,
              label: link1,
            },
            {
              onClick,
              label: link2,
            },
          ],
        }}
      >
        {children}
      </AuthCard>
    </LogoProvider>
  );

  expect(screen.getByText(logo)).toBeInTheDocument();
  expect(screen.getByText(children)).toBeInTheDocument();
  expect(screen.getByText(link1)).toBeInTheDocument();
  expect(screen.getByText(link2)).toBeInTheDocument();
});
