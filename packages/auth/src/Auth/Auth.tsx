import { useMachine } from '@xstate/react';
import { Auth as AmplifyAuth } from 'aws-amplify';
import * as React from 'react';
import { assign, createMachine } from 'xstate';

import AuthConfirmSignUp from '../AuthConfirmSignUp/AuthConfirmSignUp';
import AuthSignIn from '../AuthSignIn/AuthSignIn';
import AuthSignUp from '../AuthSignUp/AuthSignUp';

import type { OnConfirmSignUp, OnSignIn, OnSignUp } from '../types';

type AuthState =
  | {
      value: 'signIn';
      context: { email?: string };
    }
  | {
      value: 'signUp';
      context: {};
    }
  | {
      value: 'signUpConfirm';
      context: { email: string };
    }
  | {
      value: 'signUpResendConfirmation';
      context: { email: string };
    };

type AuthEvent =
  | { type: 'SIGN_UP' }
  | { type: 'SIGN_UP_CONFIRM'; email: string }
  | { type: 'SIGN_UP_CONFIRMED'; email: string }
  | { type: 'SIGN_UP_RESEND_CONFIRMATION'; email: string };

type AuthContext = { email?: string };

const authMachine = createMachine<AuthContext, AuthEvent, AuthState>(
  {
    initial: 'signIn',
    states: {
      signIn: {
        on: {
          SIGN_UP: { target: 'signUp' },
          SIGN_UP_RESEND_CONFIRMATION: {
            actions: ['assignEmail'],
            target: 'signUpConfirm',
          },
        },
      },
      signUp: {
        on: {
          SIGN_UP_CONFIRM: {
            actions: ['assignEmail'],
            target: 'signUpConfirm',
          },
        },
      },
      signUpConfirm: {
        on: {
          SIGN_UP_CONFIRMED: {
            actions: ['assignEmail'],
            target: 'signIn',
          },
        },
      },
    },
  },
  {
    actions: {
      assignEmail: assign({
        email: (_, event) => (event as any).email,
      }),
    },
  }
);

export const Auth = ({
  onSignIn: onSuccessSignIn,
}: {
  onSignIn?: () => void;
}) => {
  const [state, send] = useMachine(authMachine);

  // const { toast, setLoading } = useNotifications();

  const onSignIn = React.useCallback<OnSignIn>(async ({ email, password }) => {
    try {
      // setLoading(true);
      await AmplifyAuth.signIn(email, password);
      if (onSuccessSignIn) {
        onSuccessSignIn();
      }
      // toast('Signed In');
    } catch (error) {
      switch ((error as any).code) {
        case 'UserNotConfirmedException':
          await AmplifyAuth.resendSignUp(email);
          send({ type: 'SIGN_UP_RESEND_CONFIRMATION', email });
          break;
        default:
        // toast(JSON.stringify(error, null, 2));
      }
    } finally {
      // setLoading(false);
    }
  }, []);

  const onSignUp = React.useCallback<OnSignUp>(async ({ email, password }) => {
    try {
      // setLoading(true);
      await AmplifyAuth.signUp({
        username: email,
        password,
        attributes: { email },
      });
      // toast('Signed Up');
      send({ type: 'SIGN_UP_CONFIRM', email });
    } catch (error) {
      // toast(JSON.stringify(error, null, 2));
    } finally {
      // setLoading(false);
    }
  }, []);

  const onConfirmSignUp = React.useCallback<OnConfirmSignUp>(
    async ({ email, code }) => {
      try {
        // setLoading(true);
        await AmplifyAuth.confirmSignUp(email, code);
        // toast('Confirmed Signed In');
        send({ type: 'SIGN_UP_CONFIRMED', email });
      } catch (error) {
        // toast(JSON.stringify(error, null, 2));
      } finally {
        // setLoading(false);
      }
    },
    []
  );

  if (state.matches('signUp')) {
    return <AuthSignUp onSignUp={onSignUp} />;
  }

  if (state.matches('signUpConfirm')) {
    return (
      <AuthConfirmSignUp
        onConfirmSignUp={onConfirmSignUp}
        email={state.context.email}
      />
    );
  }

  return (
    <AuthSignIn
      onSignIn={onSignIn}
      onSignUp={() => send('SIGN_UP')}
      defaultValues={{ email: state.context.email }}
    />
  );
};

export default Auth;
