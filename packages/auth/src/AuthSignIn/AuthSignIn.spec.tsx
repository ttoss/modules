import { act, render, userEvent } from '@ttoss/test-utils';

import AuthSignIn from './AuthSignIn';

const onSignIn = jest.fn();

const onSignUp = jest.fn();

const userForm = {
  email: 'user@example.com',
  password: 'password',
};

test('Should not call the onSubmit function if click on the login button without filling in the fields', async () => {
  const user = userEvent.setup({ delay: null });

  const { getByRole } = render(
    <AuthSignIn onSignIn={onSignIn} onSignUp={onSignUp} />
  );

  await act(async () => {
    await user.click(getByRole('button'));
  });

  expect(onSignIn).toHaveBeenCalledTimes(0);
});

test('Should call the onSubmit function if click on the login button with filling in the fields', async () => {
  const user = userEvent.setup({ delay: null });

  const { getByRole, getByLabelText } = render(
    <AuthSignIn onSignIn={onSignIn} onSignUp={onSignUp} />
  );

  const emailInput = getByLabelText('email');
  const password = getByLabelText('password');
  const buttonSubmit = getByRole('button');

  await act(async () => {
    await user.type(emailInput, userForm.email);

    await user.type(password, userForm.password);

    await user.click(buttonSubmit);
  });

  expect(onSignIn).toHaveBeenCalledWith(userForm);
});
