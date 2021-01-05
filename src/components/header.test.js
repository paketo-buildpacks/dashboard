// @flow

import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './header';
import { MemoryRouter, Route, Switch } from 'react-router-dom';

describe('Header', () => {
  let result;

  beforeEach(() => {
    result = render(
      <MemoryRouter initialEntries={["/some/other/page"]}>
        <Header />
        <Switch>
          <Route path="/some/other/page">
            <div>Some Other Page</div>
          </Route>
          <Route path="/issues">
            <div>Issue List Page</div>
          </Route>
          <Route path="/">
            <div>Homepage</div>
          </Route>
        </Switch>
      </MemoryRouter>
    );
  });

  it('renders the header text', () => {
    const linkElement = result.getByText(/Paketo Buildpacks/i);

    expect(linkElement).toBeInTheDocument();
  });

  it('renders the logo', () => {
    const logo = result.getByAltText(/logo/i);

    expect(logo).toBeInTheDocument();
  });

  describe('when clicking the logo', () => {
    beforeEach(() => {
      const logo = result.getByAltText(/logo/i);

      userEvent.click(logo);
    });

    it('links to the homepage', () => {
      const homepage = result.getByText(/Homepage/i);

      expect(homepage).toBeInTheDocument();
    });
  });

  describe('when clicking the issues link', () => {
    beforeEach(() => {
      const issues = result.getByText(/Issues/i);

      userEvent.click(issues);
    });

    it('links to the issues page', () => {
      const issues = result.getByText(/Issue List Page/i);

      expect(issues).toBeInTheDocument();
    });
  });
});
