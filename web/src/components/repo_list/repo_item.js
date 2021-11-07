// @flow

import React, { type Node } from 'react';

import Repo from '../../models/repo';
import { IssueStoreInterface } from '../../stores/issue_store';
import { PullRequestStoreInterface } from '../../stores/pull_request_store';
import { ReleaseStoreInterface } from '../../stores/release_store';
import { CacheInterface } from '../../lib/cache';

import IssueCount from './issue_count';
import PullRequestCount from './pull_request_count';
import ReleaseState from './release_state';
import ExternalLink from '../lib/external_link';

import '../../styles/repo_list/repo_item.css';

type Props = {|
  repo: Repo,
  issueStore: IssueStoreInterface,
  pullRequestStore: PullRequestStoreInterface,
  releaseStore: ReleaseStoreInterface,
  cache: CacheInterface,
|};

export default class RepoItem extends React.Component<Props> {
  render(): Node {
    const parts = this.props.repo.name.split('/');

    const org = parts[0];
    const repo = parts[1];
    return (
      <div className='repo-item'>
        <div className='org'> {org} </div>
        <ExternalLink href={this.props.repo.url} className='repo'>
          {repo}
        </ExternalLink>
        <div className='issue-pull-request-count'>
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
        <ReleaseState
          repo={this.props.repo}
          releaseStore={this.props.releaseStore}
          cache={this.props.cache}
        />
      </div>
    );
  }
}
