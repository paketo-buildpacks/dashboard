// @flow

import React from 'react';
import { render } from '@testing-library/react';

import PullRequestItem from './pull_request_item';

import Repo from '../../models/repo';
import PullRequest from '../../models/pull_request';

describe('PullRequestItem', () => {
  let result;
  let repo: Repo;
  let pullRequest: PullRequest;

  beforeEach(() => {
    repo = new Repo({
      id: 1234,
      url: 'some-repo-url',
      openIssuesCount: 1,
      name: 'some-repo',
    });

    pullRequest = new PullRequest({
      id: 5678,
      number: 999,
      title: 'some-title',
      createdAt: '2020-01-10T12:12:12Z',
      url: 'some-pull-request-url',
    });

    result = render(
      <PullRequestItem
        pullRequest={pullRequest}
        repo={repo}
      />
    );
  });

  it('renders the pull request title as a link', () => {
    const title = result.getByText(/some-title/i);
    expect(title).toBeInTheDocument();
    expect(title).toHaveAttribute('href', 'some-pull-request-url');
    expect(title).toHaveAttribute('target', '_blank');
    expect(title).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the pull request number', () => {
    const number = result.getByText(/#999/i);
    expect(number).toBeInTheDocument();
  });

  it('renders the pull request repo as a link', () => {
    const repo = result.getByText(/some-repo/i);
    expect(repo).toBeInTheDocument();
    expect(repo).toHaveAttribute('href', 'some-repo-url');
    expect(repo).toHaveAttribute('target', '_blank');
    expect(repo).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders the creation date', () => {
    const date = result.getByText(/opened .* ago \(Jan 10, 2020\)/i);
    expect(date).toBeInTheDocument();
  });
});