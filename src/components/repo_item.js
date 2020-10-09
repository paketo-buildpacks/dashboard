// @flow

import React from 'react';
import type { Node } from 'react';
import '../styles/repo_item.css';
import Repo from '../models/repo';
import IssueCount from './issue_count';
import PullRequestCount from './pull_request_count';
import { IssueStoreInterface } from '../stores/issue_store';
import { PullRequestStoreInterface } from '../stores/pull_request_store';

type Props = {
  repo: Repo,
  issueStore: IssueStoreInterface,
  pullRequestStore: PullRequestStoreInterface,
};

export default class RepoItem extends React.Component<Props> {
  render(): Node {
    return (
      <div className="repo-item">
        <a
          className="name"
          href={this.props.repo.url}
          target="_blank"
          rel="noopener noreferrer"
        >{this.props.repo.name}</a>
        <div className="content">
          <IssueCount
            store={this.props.issueStore}
            repo={this.props.repo}
          />
          <PullRequestCount
            store={this.props.pullRequestStore}
            repo={this.props.repo}
          />
        </div>
      </div>
    );
  }
}
