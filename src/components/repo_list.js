// @flow

import React from 'react';
import type { Node } from 'react';
import '../styles/repo_list.css';
import Repo from '../models/repo';
import RepoItem from './repo_item';
import { IssueStoreInterface } from '../stores/issue_store';
import { RepoStoreInterface } from '../stores/repo_store';
import { PullRequestStoreInterface } from '../stores/pull_request_store';

type Props = {
  store: RepoStoreInterface,
  issueStore: IssueStoreInterface,
  pullRequestStore: PullRequestStoreInterface,
};

type State = {
  loading: boolean,
  repos: Repo[],
};

class RepoList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
      repos: [],
    };
  }

  async componentDidMount() {
    const repos = await this.props.store.list();

    this.setState({ loading: false, repos: repos });
  }

  render(): Node {
    let items = (<div className="loading">Loading...</div>);

    if (!this.state.loading) {
      items = this.state.repos.map((repo) => (
        <RepoItem
          key={repo.key}
          repo={repo}
          issueStore={this.props.issueStore}
          pullRequestStore={this.props.pullRequestStore}
        />
      ));
    }

    return (
      <div className="repo-list">
        {items}
      </div>
    );
  }
}

export default RepoList;
