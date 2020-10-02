// @flow

import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './login';

describe('Login', () => {
  let token, result;

  beforeEach(() => {
    result = render(
      <Login assignToken={(t) => { token = t; }} />
    );
  });

  it('renders the token input', () => {
    const input = result.getByLabelText(/Token/i);

    expect(input).toBeInTheDocument();
  });

  it('renders the button', () => {
    const button = result.getByText(/Submit/i);

    expect(button).toBeInTheDocument();
  });

  it('assigns the token when submitted', () => {
    const input = result.getByLabelText(/Token/i);
    const button = result.getByText(/Submit/i);

    userEvent.type(input, 'some-token');
    userEvent.click(button);

    expect(token).toEqual('some-token');
  });
});
