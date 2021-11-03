// @flow

import React, { type Node } from 'react';

import Repo from '../../models/repo';
import RepoItem from './repo_item';

import { IssueStoreInterface } from '../../stores/issue_store';
import { RepoStoreInterface } from '../../stores/repo_store';
import { PullRequestStoreInterface } from '../../stores/pull_request_store';
import { ReleaseStoreInterface } from '../../stores/release_store';
import { TimerInterface } from '../../lib/timer';
import { CacheInterface } from '../../lib/cache';

import { SyncIcon } from '@primer/octicons-react';

import '../../styles/repo_list/index.css';

type Props = {|
  repoStore: RepoStoreInterface,
  issueStore: IssueStoreInterface,
  pullRequestStore: PullRequestStoreInterface,
  releaseStore: ReleaseStoreInterface,
  timer: TimerInterface,
  cache: CacheInterface,
|};

type State = {|
  loading: boolean,
  repos: Repo[],
|};

export default class RepoList extends React.Component<Props, State> {
  handleReload: SyntheticEvent<HTMLButtonElement> => void;
  interval: number;
  cacheKey: string;

  constructor(props: Props) {
    super(props);
    this.cacheKey = '/repos';

    let repos: Repo[] = [];
    const result = this.props.cache.get(this.cacheKey);

    if (result['repos']) {
      for (let i = 0; i < result['repos'].length; i++) {
        repos.push(new Repo(result['repos'][i]));
      }
    }

    this.state = {
      loading: repos.length === 0,
      repos: repos,
    };

    this.handleReload = this.handleReload.bind(this);
  }

  componentDidMount() {
    this.load();
    this.interval = this.props.timer.setInterval(() => this.load(), 900000);
  }

  componentWillUnmount() {
    this.props.timer.clearInterval(this.interval);
  }

  handleReload(event: SyntheticEvent<HTMLButtonElement>): void {
    this.load();
  }

  async load() {
    const results = await Promise.all([
      this.props.repoStore.list('paketo-buildpacks'),
      this.props.repoStore.list('paketo-community'),
    ]);

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

    this.props.cache.set(this.cacheKey, { repos: repos });
    this.setState({ loading: false, repos: repos });
  }

  render(): Node {
    let items = (<div className='loading'>...</div>);

    if (!this.state.loading) {
      items = this.state.repos.map((repo) => (
        <RepoItem
          key={repo.id}
          repo={repo}
          issueStore={this.props.issueStore}
          pullRequestStore={this.props.pullRequestStore}
          releaseStore={this.props.releaseStore}
          cache={this.props.cache}
        />
      ));
    }

    return (
      <div className='repo-list'>
        <div className='title'>
          <h2>Overview</h2>
          <button onClick={this.handleReload}>
            <SyncIcon size={16} />
          </button>
        </div>
        <div className='list'>
          {items}
        </div>
      </div>
    );
  }
}
