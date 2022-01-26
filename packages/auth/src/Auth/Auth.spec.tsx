import { render, screen, userEvent, waitFor } from '@ttoss/test-utils';
import * as awsAmplify from 'aws-amplify';

import { Auth } from './Auth';

jest.mock('aws-amplify');

const signIn = jest.fn();
const signUp = jest.fn();
const confirmSignUp = jest.fn();

awsAmplify.Auth.signIn = signIn;
awsAmplify.Auth.signUp = signUp;
awsAmplify.Auth.confirmSignUp = confirmSignUp;

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
  userEvent.click(screen.getByText('Não tem uma conta? Cadastre-se'));

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
