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
    const { getByRole } = render(<Login onSubmit={onSubmit} />);

    userEvent.click(getByRole('button'));

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  test('Should call the onSubmit function if click on the login button with filling in the fields ', async () => {
    const { getByLabelText, getByRole } = render(<Login onSubmit={onSubmit} />);

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
