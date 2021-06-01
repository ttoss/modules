import * as React from 'react';
import { render, act } from '../../../testUtils';
import userEvent from '@testing-library/user-event';

import AuthSignIn from './AuthSignIn';

const onSubmit = jest.fn();

const user = {
  email: 'user@example.com',
  password: 'password',
};

describe('AuthSignIn', async () => {
  test('Should not call the onSubmit function if click on the login button without filling in the fields ', () => {
    const { getByRole } = render(<AuthSignIn onSubmit={onSubmit} />);

    userEvent.click(getByRole('button'));

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  test('Should call the onSubmit function if click on the login button with filling in the fields ', async () => {
    const { getByLabelText, getByRole } = render(
      <AuthSignIn onSubmit={onSubmit} />
    );

    const emailInput = getByLabelText('e-mail');
    const password = getByLabelText('senha');
    const buttonSubmit = getByRole('button');

    await act(async () => {
      userEvent.type(emailInput, user.email);

      userEvent.type(password, user.password);

      userEvent.click(buttonSubmit);
    });

    expect(onSubmit).toHaveBeenCalledWith(user);
  });
});
