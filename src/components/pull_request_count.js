// @flow

import React, { type Node } from 'react';
import '../styles/pull_request_count.css';
import PullRequest from '../models/pull_request';
import Repo from '../models/repo';
import { PullRequestStoreInterface } from '../stores/pull_request_store';
import { GitPullRequestIcon } from '@primer/octicons-react';

type Props = {
  store: PullRequestStoreInterface,
  repo: Repo,
};

type State = {
  loading: boolean,
  pullRequests: PullRequest[],
};

export default class PullRequestCount extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
      pullRequests: [],
    };
  }

  componentDidMount() {
    this.props.store.list(this.props.repo.name).then((pullRequests) => {
      this.setState({ loading: false, pullRequests: pullRequests });
    });
  }

  render(): Node {
    let count: string = '...';
    let priority: string = 'none';

    if (!this.state.loading) {
      const length = this.state.pullRequests.length;

      if (length > 0 ) {
        priority = 'low';
      }

      if (length > 3 ) {
        priority = 'medium';
      }

      if (length > 6 ) {
        priority = 'high';
      }

      count = `${length}`;
    }

    return (
      <div className={`pull-request-count ${priority}`} aria-label='pull-request-count'>
        <GitPullRequestIcon size={16} />
        <div className='count'>{count}</div>
      </div>
    );
  }
}
