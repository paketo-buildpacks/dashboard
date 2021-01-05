// @flow

import React from 'react';
import type { Node } from 'react';
import '../../styles/repo_list/repo_item.css';
import Repo from '../../models/repo';
import IssueCount from './issue_count';
import PullRequestCount from './pull_request_count';
import { IssueStoreInterface } from '../../stores/issue_store';
import { PullRequestStoreInterface } from '../../stores/pull_request_store';
import { CacheInterface } from '../../lib/cache';

type Props = {|
  repo: Repo,
  issueStore: IssueStoreInterface,
  pullRequestStore: PullRequestStoreInterface,
  cache: CacheInterface,
|};

export default class RepoItem extends React.Component<Props> {
  shouldComponentUpdate(props: Props): boolean {
    return !this.props.repo.isEqualTo(props.repo);
  }

  render(): Node {
    const parts = this.props.repo.name.split('/');

    const org = parts[0];
    const repo = parts[1];

    return (
      <div className='repo-item'>
        <div className='org'>{org}</div>
        <a
          className='repo'
          href={this.props.repo.url}
          target='_blank'
          rel='noopener noreferrer'
        >{repo}</a>
        <div className='content'>
          <IssueCount
            repo={this.props.repo}
            store={this.props.issueStore}
            cache={this.props.cache}
          />
          <PullRequestCount
            repo={this.props.repo}
            store={this.props.pullRequestStore}
            cache={this.props.cache}
          />
        </div>
      </div>
    );
  }
}
