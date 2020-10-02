// @flow

import React from 'react';
import { render } from '@testing-library/react';
import Repo from '../models/repo';
import RepoList from './repo_list';
import RepoStore from '../fakes/repo_store';

describe('RepoList', () => {
  let result, resolve
  let store: RepoStore;

  beforeEach(() => {
    store = new RepoStore();
    store.listCall.returns.repos = new Promise((res, rej) => { resolve = res; });
  });

  describe("when the promise is not resolved", () => {
    beforeEach(() => {
      result = render(
        <RepoList store={store} />
      );
    });

    it('renders a list of repos', () => {
      const loading = result.getByText(/Loading.../i);

      expect(loading).toBeInTheDocument();
    });
  });

  describe("when the promise is resolved", () => {
    beforeEach(() => {
      resolve([
        new Repo({ id: 1111, name: 'First Repository' }),
        new Repo({ id: 2222, name: 'Second Repository' }),
      ]);

      result = render(
        <RepoList store={store} />
      );
    });

    it('renders a list of repos', () => {
      const first = result.getByText(/First Repository/i);
      const second = result.getByText(/Second Repository/i);

      expect(first).toBeInTheDocument();
      expect(second).toBeInTheDocument();
    });
  });
});
