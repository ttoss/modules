import React from 'react';
import { Meta } from '@storybook/react';

import { AuthMachine } from './Auth';

const AuthSignUpComponent: Meta = {
  title: 'Modules Auth/Auth',
  component: AuthMachine,
};

export default AuthSignUpComponent;

const Template = (args: any) => <AuthMachine {...args} />;

export const Example = Template.bind({});
