import { Meta, Story } from '@storybook/react';

import { LogoProvider } from '@ttoss/auth/src/AuthCard/AuthCard';
import AuthSignIn, {
  AuthSignInProps,
} from '@ttoss/auth/src/AuthSignIn/AuthSignIn';
import { Flex } from '@ttoss/ui';

export default {
  title: 'Auth/AuthSignIn',
  component: AuthSignIn,
} as Meta;

const Logo = () => (
  <Flex
    sx={{
      backgroundColor: 'primary',
      width: '100px',
      height: '100px',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <p style={{ color: 'white' }}>LOGO</p>
  </Flex>
);

export const Example: Story<AuthSignInProps> = (args) => (
  <AuthSignIn {...args} />
);

export const WithLogo: Story<AuthSignInProps> = (args) => (
  <LogoProvider logo={<Logo />}>
    <AuthSignIn {...args} />
  </LogoProvider>
);
