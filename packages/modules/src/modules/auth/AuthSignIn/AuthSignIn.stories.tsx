import React from 'react';
import { Meta } from '@storybook/react';

import AuthSignIn from './AuthSignIn';

const AuthSignInComponent: Meta = {
  title: 'Modules Auth/AuthSignIn',
  component: AuthSignIn,
};

const Example = () => (
  <AuthSignIn
    onSignIn={(data) => alert(JSON.stringify(data))}
    onSignUp={console.log}
  />
);

export default AuthSignInComponent;

export { Example };
