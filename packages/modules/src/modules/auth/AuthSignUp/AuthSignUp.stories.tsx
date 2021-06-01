import React from 'react';
import { Meta } from '@storybook/react';

import AuthSignUp from './AuthSignUp';

const AuthSignUpComponent: Meta = {
  title: 'Modules Auth/AuthSignUp',
  component: AuthSignUp,
};

export default AuthSignUpComponent;

const Template = (args: any) => <AuthSignUp {...args} />;

export const Example = Template.bind({});
