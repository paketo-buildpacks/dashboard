// @flow

import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './login';

describe('Login', () => {
  let token, result
  let historyArgs: { pathname: string };

  beforeEach(() => {
    const assignToken = (t) => { token = t; };
    const history = {
      replace: (a) => { historyArgs = a }
    };
    const location = {
      state: {
        from: {
          pathname: '/previous-location'
        }
      }
    };

    result = render(
      <Login
        assignToken={assignToken}
        history={history}
        location={location}
      />
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

  describe('when submitted', () => {
    beforeEach(() => {
      const input = result.getByLabelText(/Token/i);
      const button = result.getByText(/Submit/i);

      userEvent.type(input, 'some-token');
      userEvent.click(button);
    });

    it('assigns the token when submitted', () => {
      expect(token).toEqual('some-token');
    });

    it('redirects to the previous location', () => {
      expect(historyArgs).toEqual({ pathname: '/previous-location' });
    });
  })
});
