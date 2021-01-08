// @flow

import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '.';

import RepoStore from '../fakes/repo_store';
import IssueStore from '../fakes/issue_store';
import PullRequestStore from '../fakes/pull_request_store';
import ReleaseStore from '../fakes/release_store';
import Timer from '../fakes/timer';
import Cache from '../fakes/cache';
import Storage from '../fakes/storage';

describe('App', () => {
  let result;
  let repoStore: RepoStore;
  let issueStore: IssueStore;
  let pullRequestStore: PullRequestStore;
  let releaseStore: ReleaseStore;
  let timer: Timer;
  let cache: Cache;
  let storage: Storage;

  beforeEach(() => {
    repoStore = new RepoStore();
    issueStore = new IssueStore();
    pullRequestStore = new PullRequestStore();
    timer = new Timer();
    cache = new Cache();
    storage = new Storage();

    result = render(
      <MemoryRouter>
        <App
          repoStore={repoStore}
          issueStore={issueStore}
          pullRequestStore={pullRequestStore}
          releaseStore={releaseStore}
          timer={timer}
          cache={cache}
          storage={storage}
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

    describe('when visiting the / path', () => {
      beforeEach(() => {
        const link = result.getByAltText(/logo/i);
        userEvent.click(link);
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
        expect(storage.getItem('token')).toEqual('some-token');
      });
    });

    describe('when visiting the /issues path', () => {
      beforeEach(() => {
        const link = result.getByText(/Issues/i);
        userEvent.click(link);
      });

      it('renders the issues list', () => {
        const reposList = result.container.querySelector('div.issue-list');
        expect(reposList).toBeInTheDocument();
      });

      it('does not render the login form', () => {
        const form = result.container.querySelector('form.login');
        expect(form).not.toBeInTheDocument();
      });

      it('assigns the token into github client', () => {
        expect(storage.getItem('token')).toEqual('some-token');
      });
    });

    describe('when visiting the /pull-requests path', () => {
      beforeEach(() => {
        const link = result.getByText(/Pull Requests/i);
        userEvent.click(link);
      });

      it('renders the pull requests list', () => {
        const reposList = result.container.querySelector('div.pull-request-list');
        expect(reposList).toBeInTheDocument();
      });

      it('does not render the login form', () => {
        const form = result.container.querySelector('form.login');
        expect(form).not.toBeInTheDocument();
      });

      it('assigns the token into github client', () => {
        expect(storage.getItem('token')).toEqual('some-token');
      });
    });
  });
});
