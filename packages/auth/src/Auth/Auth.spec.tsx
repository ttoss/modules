import * as awsAmplify from 'aws-amplify';
import { Auth } from './Auth';
import { act } from 'react-dom/test-utils';
import { render, screen, userEvent } from '@ttoss/test-utils';

jest.mock('aws-amplify');

const signIn = jest.fn();
const signUp = jest.fn();
const confirmSignUp = jest.fn();

awsAmplify.Auth.signIn = signIn;
awsAmplify.Auth.signUp = signUp;
awsAmplify.Auth.confirmSignUp = confirmSignUp;

const email = 'some@email.com';

const password = 'somepassword';

test('should call Amplify Auth.signIn', async () => {
  const user = userEvent.setup({ delay: null });

  /**
   * Arrange
   */
  render(<Auth />);

  /**
   * Act
   */
  await act(async () => {
    await user.type(screen.getByLabelText('email'), email);
    await user.type(screen.getByLabelText('password'), password);
    await user.click(screen.getByRole('button'));
  });

  /**
   * Assert
   */
  expect(signIn).toHaveBeenCalledWith(email, password);
});

test('should call Amplify Auth.signUp and Auth.confirmSignUp', async () => {
  const user = userEvent.setup({ delay: null });

  render(<Auth />);

  /**
   * Sign In screen
   */
  await act(async () => {
    await user.click(screen.getByText("Don't have an account? Sign up"));
  });

  expect(signIn).not.toHaveBeenCalled();

  /**
   * Sign Up screen
   */
  await act(async () => {
    await user.type(screen.getByLabelText('email'), email);
    await user.type(screen.getByLabelText('password'), password);
    await user.click(screen.getByRole('button'));
  });

  expect(signUp).toHaveBeenCalledWith({
    username: email,
    password,
    attributes: { email },
  });

  /**
   * Confirm Sign Up screen
   */
  const code = '123456';

  await act(async () => {
    await user.type(screen.getByLabelText('email'), code);
    await user.click(screen.getByRole('button'));
  });

  expect(confirmSignUp).toHaveBeenCalledWith(email, code);
});

test('should render logo', () => {
  const logo = <p>logo</p>;

  render(<Auth logo={logo} />);

  expect(screen.getByText('logo')).toBeInTheDocument();
});

test('loading bar should render', async () => {
  signIn.mockResolvedValue({});

  render(<Auth />);

  expect(screen.queryByRole('progressbar')).toBeNull();

  // userEvent.type(screen.getByLabelText('email'), email);
  // userEvent.type(screen.getByLabelText('password'), password);
  // userEvent.click(screen.getByRole('button'));

  // TODO: add appear and disappear tests.
});
