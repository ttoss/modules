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
  jest.mock('@ttoss/i18n', () => ({
    useIntl: jest.fn().mockReturnValue({
      formatMessage: jest.fn(),
    }),
  }));
});

test('should call Amplify Auth.signIn', async () => {
  /**
   * Arrange
   */
  render(<Auth />);

  /**
   * Act
   */
  userEvent.type(screen.getByLabelText('email'), email);
  userEvent.type(screen.getByLabelText('password'), password);
  userEvent.click(screen.getByRole('button'));

  /**
   * Assert
   */
  await waitFor(() => {
    expect(signIn).toHaveBeenCalledWith(email, password);
  });
});

jest.resetAllMocks();

// TODO: Find an way to change formatMessage return just here, this value 'Não tem uma conta? Cadastre-se' and in the other places go back to normal way

jest.mock('@ttoss/i18n', () => ({
  useIntl: jest.fn().mockReturnValue({
    formatMessage: jest.fn().mockReturnValue('Não tem uma conta? Cadastre-se'),
  }),
}));

test('should call Amplify Auth.signUp and Auth.confirmSignUp', async () => {
  render(<Auth />);

  /**
   * Sign In screen
   */
  userEvent.click(screen.getByText('Não tem uma conta? Cadastre-se'));

  await waitFor(() => {
    expect(signIn).not.toHaveBeenCalled();
  });

  jest.resetAllMocks();

  jest.mock('@ttoss/i18n', () => ({
    useIntl: jest.fn().mockReturnValue({
      formatMessage: jest.fn(),
    }),
  }));

  /**
   * Sign Up screen
   */
  userEvent.type(screen.getByLabelText('email'), email);
  userEvent.type(screen.getByLabelText('password'), password);
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

  userEvent.type(screen.getByLabelText('email'), code);
  userEvent.click(screen.getByRole('button'));

  await waitFor(() => {
    expect(confirmSignUp).toHaveBeenCalledWith(email, code);
  });
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

  userEvent.type(screen.getByLabelText('email'), email);
  userEvent.type(screen.getByLabelText('password'), password);
  userEvent.click(screen.getByRole('button'));

  await waitFor(() => {
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).toBeNull();
  });
});
