// @flow

import React from 'react';
import type { Node } from 'react';
import '../styles/repo_list.css';
import Repo from '../models/repo';
import RepoItem from './repo_item';
import { IssueStoreInterface } from '../stores/issue_store';
import { RepoStoreInterface } from '../stores/repo_store';
import { PullRequestStoreInterface } from '../stores/pull_request_store';
import { SyncIcon } from '@primer/octicons-react';

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
  handleReload: SyntheticEvent<HTMLButtonElement> => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
      repos: [],
    };

    this.handleReload = this.handleReload.bind(this);
  }

  componentDidMount() {
    this.load();
  }

  load() {
    Promise.all([
      this.props.store.list('paketo-buildpacks'),
      this.props.store.list('paketo-community'),
    ]).then((results) => {
      let repos: Repo[] = [];

      for (const result of results) {
        for (const repo of result) {
          repos.push(repo);
        }
      }

      repos.sort((a: Repo, b: Repo): number => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });

      this.setState({ loading: false, repos: repos });
    });
  }

  handleReload(event: SyntheticEvent<HTMLButtonElement>): void {
    this.load();
  }

  render(): Node {
    let items = (<div className="loading">...</div>);

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
        <div className="title">
          <h2>Overview</h2>
          <button onClick={this.handleReload}>
            <SyncIcon size={16} />
          </button>
        </div>
        <div className="list">
          {items}
        </div>
      </div>
    );
  }
}

export default RepoList;
