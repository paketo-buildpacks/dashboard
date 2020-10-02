// @flow

import React from 'react';
import type { Node } from 'react';
import Repo from '../models/repo';

type Props = {
  repo: Repo,
};

class RepoItem extends React.Component<Props> {
  render(): Node {
    return (
      <div className="repo-item">
        {this.props.repo.name}
      </div>
    );
  }
}

export default RepoItem;
