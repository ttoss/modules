import * as React from 'react';
import { render, act } from '../../testUtils';
import userEvent from '@testing-library/user-event';

import Login from './Login';

const onSubmit = jest.fn();

const user = {
  email: 'user@example.com',
  password: 'password',
};

describe('Login', async () => {
  test('Should not call the onSubmit function if click on the login button without filling in the fields ', () => {
    const { getByLabelText } = render(<Login onSubmit={onSubmit} />);

    userEvent.click(getByLabelText('submit-login'));

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  test('Should call the onSubmit function if click on the login button with filling in the fields ', async () => {
    const { getByLabelText, getByRole } = render(<Login onSubmit={onSubmit} />);

    const emailInput = getByRole('email-input');
    const password = getByRole('password');
    const buttonSubmit = getByLabelText('submit-login');

    await act(async () => {
      await userEvent.type(emailInput, user.email);

      await userEvent.type(password, user.password);

      await userEvent.click(buttonSubmit);
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
