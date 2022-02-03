import { Meta, Story } from '@storybook/react';

import AuthSignIn, {
  AuthSignInProps,
} from '@ttoss/auth/src/AuthSignIn/AuthSignIn';
import {
  AuthContainer,
  AuthContainerProps,
} from '@ttoss/auth/src/AuthContainer/AuthContainer';

export default {
  title: 'Auth/AuthContainer',
  component: AuthContainer,
} as Meta;

const Template: Story<AuthContainerProps & AuthSignInProps> = (args) => (
  <AuthContainer {...args}>
    <AuthSignIn {...args} />
  </AuthContainer>
);

export const DefaultBackground = Template.bind({});

export const RandomBackgroundImage = Template.bind({});
RandomBackgroundImage.args = {
  backgroundImageUrl: 'https://static.cdn.siflor.com.br/images/siflor-bg.webp',
};
