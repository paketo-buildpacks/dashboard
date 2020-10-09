// @flow

import React from 'react';
import { render } from '@testing-library/react';
import PullRequest from '../models/pull_request';
import Repo from '../models/repo';
import PullRequestCount from './pull_request_count';
import PullRequestStore from '../fakes/pull_request_store';

describe('PullRequestCount', () => {
  let result, resolve;
  let store: PullRequestStore;
  let repo: Repo;

  beforeEach(() => {
    store = new PullRequestStore();
    store.listCall.returns.pullRequests = new Promise((res, rej) => { resolve = res; });

    repo = new Repo({
      name: 'some-org/some-repo',
      url: 'some-url',
    });
  });

  describe('when the promise is not resolved', () => {
    beforeEach(() => {
      result = render(
        <PullRequestCount
          store={store}
          repo={repo}
        />
      );
    });

    it('renders loading text', () => {
      const loading = result.getByText(/.../i);

      expect(loading).toBeInTheDocument();
    });
  });

  describe('when the promise is resolved', () => {
    beforeEach(() => {
      resolve([
        new PullRequest({ number: 1 }),
        new PullRequest({ number: 2 }),
        new PullRequest({ number: 3 }),
      ]);

      result = render(
        <PullRequestCount
          store={store}
          repo={repo}
        />
      );
    });

    it('renders a count of open pull requests', () => {
      const count = result.getByText(/3/i);

      expect(count).toBeInTheDocument();
    });
  });
});
