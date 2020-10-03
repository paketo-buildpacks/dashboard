// @flow

import React from 'react';
import { render } from '@testing-library/react';
import RepoItem from './repo_item';
import Repo from '../models/repo';
import IssueStore from '../fakes/issue_store';

describe('RepoItem', () => {
  let result;

  beforeEach(() => {
    const repo: Repo = new Repo({
      name: 'some-org/some-repo',
      url: 'some-url',
    });

    const issueStore: IssueStore = new IssueStore();

    result = render(
      <RepoItem
        repo={repo}
        issueStore={issueStore}
      />
    );
  });

  it('renders the name of the repository as a link', () => {
    const nameLink = result.getByText(/some-org\/some-repo/i);

    expect(nameLink).toBeInTheDocument();
    expect(nameLink).toHaveAttribute('href', 'some-url');
    expect(nameLink).toHaveAttribute('target', '_blank');
    expect(nameLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the number of open issues', () => {
    const issueCount = result.getByRole('generic', { name: 'issue-count' });

    expect(issueCount).toBeInTheDocument();
  });
});
