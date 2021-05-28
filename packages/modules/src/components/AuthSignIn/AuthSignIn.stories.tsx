import React from 'react';
import { Meta } from '@storybook/react';

import AuthSignIn from './AuthSignIn';

const AuthSignInComponent: Meta = {
  title: 'Modules Authentication/AuthSignIn',
  component: AuthSignIn,
};

const Example = () => (
  <AuthSignIn onSubmit={(data) => alert(JSON.stringify(data))} />
);

export default AuthSignInComponent;

export { Example };
