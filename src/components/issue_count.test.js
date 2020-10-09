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
      const loading = result.getByText(/.../i);

      expect(loading).toBeInTheDocument();
    });
  });

  describe('when the promise is resolved', () => {
    describe('when there are 0 issues', () => {
      beforeEach(() => {
        resolve([]);

        result = render(
          <IssueCount
            store={store}
            repo={repo}
          />
        );
      });

      it('classifies the priority as none', () => {
        const count = result.getByRole('generic', { name: 'issue-count' });

        expect(count).toHaveTextContent(/0/i);
        expect(count).toHaveClass('none');
      });
    });

    describe('when there are less than 4 issues', () => {
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

      it('classifies the priority as low', () => {
        const count = result.getByRole('generic', { name: 'issue-count' });

        expect(count).toHaveTextContent(/3/i);
        expect(count).toHaveClass('low');
      });
    });

    describe('when there are less than 7 issues', () => {
      beforeEach(() => {
        resolve([
          new Issue({ number: 1 }),
          new Issue({ number: 2 }),
          new Issue({ number: 3 }),
          new Issue({ number: 4 }),
          new Issue({ number: 5 }),
        ]);

        result = render(
          <IssueCount
            store={store}
            repo={repo}
          />
        );
      });

      it('classifies the priority as medium', () => {
        const count = result.getByRole('generic', { name: 'issue-count' });

        expect(count).toHaveTextContent(/5/i);
        expect(count).toHaveClass('medium');
      });
    });

    describe('when there are 7 or more issues', () => {
      beforeEach(() => {
        resolve([
          new Issue({ number: 1 }),
          new Issue({ number: 2 }),
          new Issue({ number: 3 }),
          new Issue({ number: 4 }),
          new Issue({ number: 5 }),
          new Issue({ number: 6 }),
          new Issue({ number: 7 }),
          new Issue({ number: 8 }),
        ]);

        result = render(
          <IssueCount
            store={store}
            repo={repo}
          />
        );
      });

      it('classifies the priority as high', () => {
        const count = result.getByRole('generic', { name: 'issue-count' });

        expect(count).toHaveTextContent(/8/i);
        expect(count).toHaveClass('high');
      });
    });
  });
});
