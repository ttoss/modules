import React from 'react';
import { Meta } from '@storybook/react';

import AuthSignUp from './AuthSignUp';

const AuthSignUpComponent: Meta = {
  title: 'Modules Authentication/AuthSignUp',
  component: AuthSignUp,
};

const Example = () => (
  <AuthSignUp onSubmit={(data) => alert(JSON.stringify(data))} />
);

export default AuthSignUpComponent;

export { Example };
