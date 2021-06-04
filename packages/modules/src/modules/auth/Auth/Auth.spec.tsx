import * as React from 'react';

import { render, screen, userEvent, waitFor } from '../../../testUtils';

const signIn = jest.fn();

const signUp = jest.fn();

const confirmSignUp = jest.fn();

jest.mock('aws-amplify', () => ({
  Auth: {
    signIn,
    signUp,
    confirmSignUp,
  },
}));

import Auth from './Auth';

const email = 'some@email.com';

const password = 'somepassword';

beforeEach(() => {
  jest.resetAllMocks();
});

test('should call Amplify Auth.signIn', async () => {
  /**
   * Arrange
   */
  render(<Auth />);

  /**
   * Act
   */
  userEvent.type(screen.getByLabelText('e-mail'), email);
  userEvent.type(screen.getByLabelText('senha'), password);
  userEvent.click(screen.getByRole('button'));

  /**
   * Assert
   */
  await waitFor(() => {
    expect(signIn).toHaveBeenCalledWith(email, password);
  });
});

test('should call Amplify Auth.signUp and Auth.confirmSignUp', async () => {
  render(<Auth />);

  /**
   * Sign In screen
   */
  userEvent.click(screen.getByText('Criar Conta'));

  await waitFor(() => {
    expect(signIn).not.toHaveBeenCalled();
  });

  /**
   * Sign Up screen
   */
  userEvent.type(screen.getByLabelText('e-mail'), email);
  userEvent.type(screen.getByLabelText('senha'), password);
  userEvent.click(screen.getByRole('button'));

  await waitFor(() => {
    expect(signUp).toHaveBeenCalledWith({
      username: email,
      password,
      attributes: { email },
    });
  });

  /**
   * Confirm Sign Up screen
   */
  const code = '123456';

  userEvent.type(screen.getByLabelText('Confirmation Code'), code);
  userEvent.click(screen.getByRole('button'));

  await waitFor(() => {
    expect(confirmSignUp).toHaveBeenCalledWith(email, code);
  });
});
