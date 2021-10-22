// @flow

import React, { type Node } from 'react';

import Issue from '../../models/issue';
import Repo from '../../models/repo';
import { IssueStoreInterface } from '../../stores/issue_store';
import { CacheInterface } from '../../lib/cache';
import { IssueOpenedIcon } from '@primer/octicons-react';

import ExternalLink from '../lib/external_link';

import '../../styles/repo_list/issue_count.css';

type Props = {|
  repo: Repo,
  cache: CacheInterface,
  store: IssueStoreInterface,
|};

type State = {|
  issues: Issue[],
|};

export default class IssueCount extends React.Component<Props, State> {
  cacheKey: string;

  constructor(props: Props) {
    super(props);
    this.cacheKey = `/repos/${props.repo.name}/issues`;

    let issues: Issue[] = [];
    const result = this.props.cache.get(this.cacheKey);

    if (result['issues']) {
      for (let i = 0; i < result['issues'].length; i++) {
        issues.push(new Issue(result['issues'][i]));
      }
    }

    this.state = {
      issues: issues,
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
    const issues = await this.props.store.list(this.props.repo.name)

    this.props.cache.set(this.cacheKey, { issues: issues });
    this.setState({ issues: issues });
  }

  render(): Node {
    let priority: string = 'none';
    const count = this.state.issues.length;

    if (count > 0) {
      priority = 'low';
    }

    if (count > 3) {
      priority = 'medium';
    }

    if (count > 6) {
      priority = 'high';
    }

    return (
      <ExternalLink
        className={`issue-count ${priority}`}
        href={`${this.props.repo.url}/issues`}
        aria-label='issue-count'
      >
        <IssueOpenedIcon size={16} />
        <div className='count'>{count}</div>
      </ExternalLink>
    );
  }
}
