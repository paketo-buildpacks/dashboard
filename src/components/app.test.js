// @flow

import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './app';

import RepoStore from '../fakes/repo_store';
import GitHubClient from '../fakes/github_client';

describe('App', () => {
  let result, repoStore, gitHubClient;

  beforeEach(() => {
    repoStore = new RepoStore();
    gitHubClient = new GitHubClient();

    result = render(
      <App
        repoStore={repoStore}
        gitHubClient={gitHubClient}
      />
    );
  });

  it('renders the header', () => {
    const header = result.container.querySelector('header');

    expect(header).toBeInTheDocument();
  });

  describe('when there is no token', () => {
    it('renders the login form', () => {
      const form = result.container.querySelector('form#login');

      expect(form).toBeInTheDocument();
    });

    it('does not render the repo list', () => {
      const reposList = result.container.querySelector('div#repo-list');

      expect(reposList).not.toBeInTheDocument();
    });
  });

  describe('when the token is filled in', () => {
    beforeEach(() => {
      const input = result.getByLabelText(/Token/i);
      const button = result.getByText(/Submit/i);

      userEvent.type(input, 'some-token');
      userEvent.click(button);
    });

    it('renders the repo list', () => {
      const reposList = result.container.querySelector('div.repo-list');

      expect(reposList).toBeInTheDocument();
    });

    it('does not render the login form', () => {
      const form = result.container.querySelector('form#login');
      expect(form).not.toBeInTheDocument();
    });

    it('assigns the token into github client', () => {
      expect(gitHubClient.authenticated()).toEqual(true);
    });
  });
});
