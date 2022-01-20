import { Meta, Story } from '@storybook/react';

import AuthSignIn, {
  AuthSignInProps,
} from '@ttoss/auth/src/AuthSignIn/AuthSignIn';

export default {
  title: 'Auth/AuthSignIn',
  component: AuthSignIn,
} as Meta;

export const Example: Story<AuthSignInProps> = (args) => (
  <AuthSignIn {...args} />
);
