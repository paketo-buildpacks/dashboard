// @flow

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './private_route';

describe('PrivateRoute', () => {
  let result;

  describe("when the user is not authenticated", () => {
    beforeEach(() => {
      result = render(
        <MemoryRouter>
          <Switch>
            <Route path="/login">
              <div>Unauthenticated</div>
            </Route>
            <PrivateRoute path="/" authenticated={false}>
              <div>Authenticated</div>
            </PrivateRoute>
          </Switch>
        </MemoryRouter>
      );
    });

    it('redirects to login if the user is not authenticated', () => {
      const unauthenticated = result.getByText(/Unauthenticated/i);
      expect(unauthenticated).toBeInTheDocument();
    });
  });

  describe("when the user is authenticated", () => {
    beforeEach(() => {
      result = render(
        <MemoryRouter>
          <Switch>
            <Route path="/login">
              <div>Unauthenticated</div>
            </Route>
            <PrivateRoute path="/" authenticated={false}>
              <div>Authenticated</div>
            </PrivateRoute>
          </Switch>
        </MemoryRouter>
      );
    });

    it('renders the page', () => {
      const authenticated = result.getByText(/Authenticated/i);
      expect(authenticated).toBeInTheDocument();
    });
  });
});
