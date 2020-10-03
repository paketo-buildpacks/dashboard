// @flow

import React from 'react';
import { render } from '@testing-library/react';
import Issue from '../models/issue';
import Repo from '../models/repo';
import IssueCount from './issue_count';
import IssueStore from '../fakes/issue_store';

describe('IssueCount', () => {
  let result, resolve;
  let store: IssueStore;
  let repo: Repo;

  beforeEach(() => {
    store = new IssueStore();
    store.listCall.returns.issues = new Promise((res, rej) => { resolve = res; });

    repo = new Repo({
      name: 'some-org/some-repo',
      url: 'some-url',
    });
  });

  describe('when the promise is not resolved', () => {
    beforeEach(() => {
      result = render(
        <IssueCount
          store={store}
          repo={repo}
        />
      );
    });

    it('renders loading text', () => {
      const loading = result.getByText(/Loading.../i);

      expect(loading).toBeInTheDocument();
    });
  });

  describe('when the promise is resolved', () => {
    beforeEach(() => {
      resolve([
        new Issue({ number: 1 }),
        new Issue({ number: 2 }),
        new Issue({ number: 3 }),
      ]);

      result = render(
        <IssueCount
          store={store}
          repo={repo}
        />
      );
    });

    it('renders a count of open issues', () => {
      const count = result.getByText(/3/i);

      expect(count).toBeInTheDocument();
    });
  });
});
