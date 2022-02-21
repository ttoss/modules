import { act, render, userEvent } from '@ttoss/test-utils';

import AuthSignUp from './AuthSignUp';

const onSignUp = jest.fn();

const onReturnToSignIn = jest.fn();

const user = {
  email: 'user@example.com',
  password: 'password',
};

test('Should not call the onSubmit function if click on the Signup button without filling in the fields ', () => {
  const { getByRole } = render(
    <AuthSignUp {...{ onSignUp, onReturnToSignIn }} />
  );

  userEvent.click(getByRole('button'));

  expect(onSignUp).toHaveBeenCalledTimes(0);
});

test('Should call the onSubmit function if click on the Signup button with filling in the fields ', async () => {
  const { getByPlaceholderText, getByRole } = render(
    <AuthSignUp {...{ onSignUp, onReturnToSignIn }} />
  );

  const emailInput = getByPlaceholderText('Email');
  const password = getByPlaceholderText('Senha');
  const buttonSubmit = getByRole('button');

  await act(async () => {
    userEvent.type(emailInput, user.email);

    userEvent.type(password, user.password);

    userEvent.click(buttonSubmit);
  });

  expect(onSignUp).toHaveBeenCalledWith(user);
});
