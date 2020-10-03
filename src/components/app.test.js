// @flow

import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './app';

import GitHubClient from '../fakes/github_client';
import RepoStore from '../fakes/repo_store';
import IssueStore from '../fakes/issue_store';

describe('App', () => {
  let result;
  let gitHubClient: GitHubClient;
  let repoStore: RepoStore;
  let issueStore: IssueStore;

  beforeEach(() => {
    gitHubClient = new GitHubClient();
    repoStore = new RepoStore();
    issueStore = new IssueStore();

    result = render(
      <App
        gitHubClient={gitHubClient}
        repoStore={repoStore}
        issueStore={issueStore}
      />
    );
  });

  it('renders the header', () => {
    const header = result.container.querySelector('header');

    expect(header).toBeInTheDocument();
  });

  describe('when there is no token', () => {
    it('renders the login form', () => {
      const form = result.container.querySelector('form.login');

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
      const form = result.container.querySelector('form.login');
      expect(form).not.toBeInTheDocument();
    });

    it('assigns the token into github client', () => {
      expect(gitHubClient.authenticated()).toEqual(true);
    });
  });
});
