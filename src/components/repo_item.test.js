// @flow

import React from 'react';
import { render } from '@testing-library/react';
import RepoItem from './repo_item';
import Repo from '../models/repo';

describe('RepoItem', () => {
  let result;

  beforeEach(() => {
    const repo: Repo = new Repo({ name: 'some-name' });

    result = render(
      <RepoItem repo={repo} />
    );
  });

  it('renders a repository', () => {
    const name = result.getByText(/some-name/i);

    expect(name).toBeInTheDocument();
  });
});
