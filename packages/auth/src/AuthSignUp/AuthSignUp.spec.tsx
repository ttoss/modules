import { act, render, userEvent } from '@ttoss/test-utils';
import AuthSignUp from './AuthSignUp';

const onSignUp = jest.fn();

const onReturnToSignIn = jest.fn();

const userForm = {
  email: 'user@example.com',
  password: 'password',
};

test('Should not call the onSubmit function if click on the Signup button without filling in the fields', async () => {
  const user = userEvent.setup({ delay: null });

  const { getByRole } = render(
    <AuthSignUp {...{ onSignUp, onReturnToSignIn }} />
  );

  await act(async () => {
    await user.click(getByRole('button'));
  });

  expect(onSignUp).toHaveBeenCalledTimes(0);
});

test('Should call the onSubmit function if click on the Signup button with filling in the fields', async () => {
  const user = userEvent.setup({ delay: null });

  const { getByRole, getByLabelText } = render(
    <AuthSignUp {...{ onSignUp, onReturnToSignIn }} />
  );

  const emailInput = getByLabelText('email');
  const password = getByLabelText('password');
  const buttonSubmit = getByRole('button');

  await act(async () => {
    await user.type(emailInput, userForm.email);

    await user.type(password, userForm.password);

    await user.click(buttonSubmit);
  });

  expect(onSignUp).toHaveBeenCalledWith(userForm);
});
