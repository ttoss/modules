import { useMachine } from '@xstate/react';
import { Auth as AmplifyAuth } from 'aws-amplify';
import * as React from 'react';
import { createMachine } from 'xstate';

import { useNotifications } from '../../notifications';

import AuthSignIn from '../AuthSignIn/AuthSignIn';
import AuthSignUp from '../AuthSignUp/AuthSignUp';

import type { OnSignIn, OnSignUp } from '../types';

type AuthState = {
  value: 'signIn';
  context: {};
};

type AuthEvent = { type: 'SIGN_UP' };

type AuthContext = {};

const authMachine = createMachine<AuthContext, AuthEvent, AuthState>({
  initial: 'signIn',
  states: {
    signIn: {
      on: {
        SIGN_UP: { target: 'signUp' },
      },
    },
    signUp: {},
  },
});

export const AuthMachine = ({
  onSignIn,
  onSignUp,
}: {
  onSignIn: OnSignIn;
  onSignUp: OnSignUp;
}) => {
  const [state, send] = useMachine(authMachine);

  if (state.value === 'signUp') {
    return <AuthSignUp onSignUp={onSignUp} />;
  }

  return <AuthSignIn onSignIn={onSignIn} onSignUp={() => send('SIGN_UP')} />;
};

const Auth = () => {
  const { toast, setLoading } = useNotifications();

  const onSignIn = React.useCallback<OnSignIn>(({ email, password }) => {
    setLoading(true);
    AmplifyAuth.signIn(email, password)
      .then(() => toast('Signed In'))
      .catch((err) => toast(JSON.stringify(err, null, 2)))
      .finally(() => setLoading(false));
  }, []);

  const onSignUp = React.useCallback<OnSignUp>(({ email, password }) => {
    AmplifyAuth.signUp({
      username: email,
      password,
      attributes: { email },
    }).catch((err) => console.log(err));
  }, []);

  return <AuthMachine onSignIn={onSignIn} onSignUp={onSignUp} />;
};

export default Auth;
