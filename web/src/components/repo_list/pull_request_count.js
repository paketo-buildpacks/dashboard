// @flow

import React, { type Node } from 'react';

import PullRequest from '../../models/pull_request';
import Repo from '../../models/repo';
import { type PullRequestStoreInterface } from '../../stores/pull_request_store';
import { type CacheInterface } from '../../lib/cache';

import ExternalLink from '../lib/external_link';
import { GitPullRequestIcon } from '@primer/octicons-react';

import '../../styles/repo_list/pull_request_count.css';

type Props = {|
  repo: Repo,
  cache: CacheInterface,
  store: PullRequestStoreInterface,
|};

type State = {|
  pullRequests: PullRequest[],
|};

export default class PullRequestCount extends React.Component<Props, State> {
  cacheKey: string;

  constructor(props: Props) {
    super(props);
    this.cacheKey = `/repos/${props.repo.name}/pull_requests`;

    let pullRequests: PullRequest[] = [];
    const result = this.props.cache.get(this.cacheKey);

    if (result['pull_requests']) {
      for (let i = 0; i < result['pull_requests'].length; i++) {
        pullRequests.push(new PullRequest(result['pull_requests'][i]));
      }
    }

    this.state = {
      pullRequests: pullRequests,
    };
  }

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(previousProps: Props) {
    if (this.props.repo.openIssuesCount !== previousProps.repo.openIssuesCount) {
      this.load();
    }
  }

  async load() {
    const pullRequests = await this.props.store.list(this.props.repo.name)

    this.props.cache.set(this.cacheKey, { pull_requests: pullRequests });
    this.setState({ pullRequests: pullRequests });
  }

  render(): Node {
    let priority: string = 'none';
    const count = this.state.pullRequests.length;

    if (count > 0 ) {
      priority = 'low';
    }

    if (count > 3 ) {
      priority = 'medium';
    }

    if (count > 6 ) {
      priority = 'high';
    }

    return (
      <ExternalLink
        href={`${this.props.repo.url}/pulls`}
        className={`pull-request-count ${priority}`}
        aria-label='pull-request-count'
      >
        <GitPullRequestIcon size={16} />
        <div className='count'>{count}</div>
      </ExternalLink>
    );
  }
}
