// @flow

import React, { type Node } from 'react';

import { CacheInterface } from '../../lib/cache';
import { RepoStoreInterface } from '../../stores/repo_store';
import { PullRequestStoreInterface } from '../../stores/pull_request_store';

import Repo from '../../models/repo';
import PullRequest from '../../models/pull_request';

import PullRequestItem from './pull_request_item';

import '../../styles/pull_request_list/index.css';

type RepoPullRequest = {|
  repo: Repo,
  pullRequest: PullRequest,
|};

type Props = {|
  cache: CacheInterface,
  repoStore: RepoStoreInterface,
  pullRequestStore: PullRequestStoreInterface,
|};

type State = {|
  loading: boolean,
  pullRequests: RepoPullRequest[],
|};

export default class PullRequestList extends React.Component<Props,State> {
  constructor(props: Props) {
    super(props);

    const pullRequests: RepoPullRequest[] = [];
    const cachedRepos = this.props.cache.get('/repos');

    if (cachedRepos['repos']) {
      for (let repo of cachedRepos['repos']) {
        const cachedPullRequests = this.props.cache.get(`/repos/${repo.name}/pull_requests`);
        if (cachedPullRequests['pull_requests']) {
          for (let pullRequest of cachedPullRequests['pull_requests']) {
            pullRequests.push({
              repo: repo,
              pullRequest: new PullRequest(pullRequest),
            });
          }
        }
      }
    }

    pullRequests.sort((a: RepoPullRequest, b: RepoPullRequest): number => {
      const createdAtA = a.pullRequest.createdAt.toMillis();
      const createdAtB = b.pullRequest.createdAt.toMillis();

      if (createdAtA < createdAtB) {
        return -1;
      }

      if (createdAtA > createdAtB) {
        return 1;
      }

      return 0;
    });

    this.state = {
      loading: pullRequests.length === 0,
      pullRequests: pullRequests,
    }
  }

  componentDidMount() {
    this.load();
  }

  async load() {
    const reposByOrg = await Promise.all([
      this.props.repoStore.list('paketo-buildpacks'),
      this.props.repoStore.list('paketo-community'),
    ]);

    const repos: Repo[] = [];
    const promises: Promise<PullRequest[]>[] = [];

    for (let orgRepos: Repo[] of reposByOrg) {
      for (let repo: Repo of orgRepos) {
        repos.push(repo);

        const promise = this.props.pullRequestStore.list(repo.name);
        promises.push(promise);
      }
    }

    const pullRequestsByRepo = await Promise.all(promises);
    const pullRequests: RepoPullRequest[] = [];

    for (let i = 0; i < pullRequestsByRepo.length; i++) {
      const repoPullRequests: PullRequest[] = pullRequestsByRepo[i];
      const repo: Repo = repos[i];

      this.props.cache.set(`/repos/${repo.name}/pull_requests`, { pull_requests: repoPullRequests });

      for (let pullRequest: PullRequest of repoPullRequests) {
        pullRequests.push({
          repo: repo,
          pullRequest: pullRequest,
        });
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

    this.props.cache.set('/repos', { repos: repos });

    pullRequests.sort((a: RepoPullRequest, b: RepoPullRequest): number => {
      const createdAtA = a.pullRequest.createdAt.toMillis();
      const createdAtB = b.pullRequest.createdAt.toMillis();

      if (createdAtA < createdAtB) {
        return -1;
      }

      if (createdAtA > createdAtB) {
        return 1;
      }

      return 0;
    });

    this.setState({ loading: false, pullRequests: pullRequests });
  }

  render(): Node {
    let items: Node = (<div className='loading'>...</div>);

    if (!this.state.loading) {
      items = this.state.pullRequests.map(pr => (
        <PullRequestItem
          key={pr.pullRequest.id}
          pullRequest={pr.pullRequest}
          repo={pr.repo}
        />
      ));
    }

    return (
      <div className='pull-request-list'>
        <div className='title'>
          <h2> Open Pull Requests</h2>
          <div className='count'>({this.state.pullRequests.length})</div>
        </div>
        <div className='list'>
          {items}
        </div>
      </div>
    );
  }
}
