import { act, render, userEvent } from '@ttoss/test-utils';

import AuthSignIn from './AuthSignIn';

const onSignIn = jest.fn();

const onSignUp = jest.fn();

jest.mock('@ttoss/i18n', () => ({
  useIntl: jest.fn().mockReturnValue({
    formatMessage: jest.fn(),
  }),
}));

const user = {
  email: 'user@example.com',
  password: 'password',
};

describe('AuthSignIn', () => {
  test('Should not call the onSubmit function if click on the login button without filling in the fields ', () => {
    const { getByRole } = render(
      <AuthSignIn onSignIn={onSignIn} onSignUp={onSignUp} />
    );

    userEvent.click(getByRole('button'));

    expect(onSignIn).toHaveBeenCalledTimes(0);
  });

  test('Should call the onSubmit function if click on the login button with filling in the fields ', async () => {
    const { getByRole, getByLabelText } = render(
      <AuthSignIn onSignIn={onSignIn} onSignUp={onSignUp} />
    );

    const emailInput = getByLabelText('email');
    const password = getByLabelText('password');
    const buttonSubmit = getByRole('button');

    await act(async () => {
      userEvent.type(emailInput, user.email);

      userEvent.type(password, user.password);

      userEvent.click(buttonSubmit);
    });

    expect(onSignIn).toHaveBeenCalledWith(user);
  });
});
