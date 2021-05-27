import * as React from 'react';
import { render, act } from '../../testUtils';
import userEvent from '@testing-library/user-event';

import AuthSignUp from './AuthSignUp';

const onSubmit = jest.fn();

const user = {
  email: 'user@example.com',
  password: 'password',
};

describe('Signup', async () => {
  test('Should not call the onSubmit function if click on the Signup button without filling in the fields ', () => {
    const { getByRole } = render(<AuthSignUp onSubmit={onSubmit} />);

    userEvent.click(getByRole('button'));

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  test('Should call the onSubmit function if click on the Signup button with filling in the fields ', async () => {
    const { getByLabelText, getByRole } = render(
      <AuthSignUp onSubmit={onSubmit} />
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
