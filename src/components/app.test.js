// @flow

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from './app';

import GitHubClient from '../fakes/github_client';
import RepoStore from '../fakes/repo_store';
import IssueStore from '../fakes/issue_store';
import PullRequestStore from '../fakes/pull_request_store';
import Timer from '../fakes/timer';

describe('App', () => {
  let result;
  let gitHubClient: GitHubClient;
  let repoStore: RepoStore;
  let issueStore: IssueStore;
  let pullRequestStore: PullRequestStore;
  let timer: Timer;

  beforeEach(() => {
    gitHubClient = new GitHubClient();
    repoStore = new RepoStore();
    issueStore = new IssueStore();
    pullRequestStore = new PullRequestStore();
    timer = new Timer();

    result = render(
      <MemoryRouter>
        <App
          gitHubClient={gitHubClient}
          repoStore={repoStore}
          issueStore={issueStore}
          pullRequestStore={pullRequestStore}
          timer={timer}
        />
      </MemoryRouter>
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
