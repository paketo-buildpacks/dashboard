// @flow

import React from 'react';
import { render } from '@testing-library/react';
import PullRequest from '../../models/pull_request';
import Repo from '../../models/repo';
import PullRequestCount from './pull_request_count';
import PullRequestStore from '../../fakes/pull_request_store';
import Cache from '../../fakes/cache';

describe('PullRequestCount', () => {
  let result, resolve;
  let store: PullRequestStore;
  let cache: Cache;
  let repo: Repo;

  beforeEach(() => {
    store = new PullRequestStore();
    store.listCall.returns.promises.push(new Promise((res, rej) => { resolve = res; }));

    cache = new Cache();

    repo = new Repo({
      name: 'some-org/some-repo',
      url: 'some-url',
      openIssuesCount: 3,
    });
  });

  describe('when the promise is not resolved', () => {
    beforeEach(() => {
      result = render(
        <PullRequestCount
          repo={repo}
          store={store}
          cache={cache}
        />
      );
    });

    it('renders a zero count', () => {
      const loading = result.getByText(/0/i);

      expect(loading).toBeInTheDocument();
    });
  });

  describe('when the promise is resolved', () => {
    describe('when there are 0 pull requests', () => {
      beforeEach(() => {
        resolve([]);

        result = render(
          <PullRequestCount
            repo={repo}
            store={store}
            cache={cache}
          />
        );
      });

      it('classifies the priority as low', () => {
        const count = result.getByRole('generic', { name: 'pull-request-count' });

        expect(count).toHaveTextContent(/0/i);
        expect(count).toHaveClass('none');
      });
    });

    describe('when there are less than 4 pull requests', () => {
      beforeEach(() => {
        resolve([
          new PullRequest({ number: 1 }),
          new PullRequest({ number: 2 }),
          new PullRequest({ number: 3 }),
        ]);

        result = render(
          <PullRequestCount
            repo={repo}
            store={store}
            cache={cache}
          />
        );
      });

      it('classifies the priority as low', () => {
        const count = result.getByRole('generic', { name: 'pull-request-count' });

        expect(count).toHaveTextContent(/3/i);
        expect(count).toHaveClass('low');
      });
    });

    describe('when there are less than 7 pull requests', () => {
      beforeEach(() => {
        resolve([
          new PullRequest({ number: 1 }),
          new PullRequest({ number: 2 }),
          new PullRequest({ number: 3 }),
          new PullRequest({ number: 4 }),
          new PullRequest({ number: 5 }),
        ]);

        result = render(
          <PullRequestCount
            repo={repo}
            store={store}
            cache={cache}
          />
        );
      });

      it('classifies the priority as medium', () => {
        const count = result.getByRole('generic', { name: 'pull-request-count' });

        expect(count).toHaveTextContent(/5/i);
        expect(count).toHaveClass('medium');
      });
    });

    describe('when there are 7 or more pull requests', () => {
      beforeEach(() => {
        resolve([
          new PullRequest({ number: 1 }),
          new PullRequest({ number: 2 }),
          new PullRequest({ number: 3 }),
          new PullRequest({ number: 4 }),
          new PullRequest({ number: 5 }),
          new PullRequest({ number: 6 }),
          new PullRequest({ number: 7 }),
          new PullRequest({ number: 8 }),
        ]);

        result = render(
          <PullRequestCount
            repo={repo}
            store={store}
            cache={cache}
          />
        );
      });

      it('classifies the priority as high', () => {
        const count = result.getByRole('generic', { name: 'pull-request-count' });

        expect(count).toHaveTextContent(/8/i);
        expect(count).toHaveClass('high');
      });
    });
  });
});
