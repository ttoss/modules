import * as React from 'react';
import { render, fireEvent } from '../../testUtils';

import Login from './Login';

const onSubmit = jest.fn();

const user = {
  email: 'user@example.com',
  password: 'password',
};

describe('Login', async () => {
  test('Should not call the onSubmit function if click on the login button without filling in the fields ', () => {
    const { getByLabelText } = render(<Login onSubmit={onSubmit} />);

    fireEvent.click(getByLabelText('submit-login'));

    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  test('Should call the onSubmit function if click on the login button with filling in the fields ', () => {
    const { getByLabelText } = render(
      <Login onSubmit={onSubmit} defaultValues={user} />
    );

    // TODO: Verificar porque a funcao nao está sendo chamada

    fireEvent.click(getByLabelText('submit-login'));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
