// @flow

import React from 'react';
import { render } from '@testing-library/react';
import Repo from '../models/repo';
import RepoList from './repo_list';
import RepoStore from '../fakes/repo_store';
import IssueStore from '../fakes/issue_store';

describe('RepoList', () => {
  let result, resolve
  let store: RepoStore;
  let issueStore: IssueStore;

  beforeEach(() => {
    store = new RepoStore();
    store.listCall.returns.repos = new Promise((res, rej) => { resolve = res; });

    issueStore = new IssueStore();
  });

  describe("when the promise is not resolved", () => {
    beforeEach(() => {
      result = render(
        <RepoList
          store={store}
          issueStore={issueStore}
        />
      );
    });

    it('renders loading text', () => {
      const loading = result.getByText(/Loading.../i);

      expect(loading).toBeInTheDocument();
    });
  });

  describe("when the promise is resolved", () => {
    beforeEach(() => {
      resolve([
        new Repo({
          name: 'First Repository',
          url: 'first-url',
        }),
        new Repo({
          name: 'Second Repository',
          url: 'second-url',
        }),
      ]);

      result = render(
        <RepoList
          store={store}
          issueStore={issueStore}
        />
      );
    });

    it('renders a list of repos', () => {
      const first = result.getByText(/First Repository/i);
      expect(first).toBeInTheDocument();

      const second = result.getByText(/Second Repository/i);
      expect(second).toBeInTheDocument();
    });
  });
});
