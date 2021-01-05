// @flow

import React, { type Node } from 'react';

import { RepoStoreInterface } from '../../stores/repo_store';
import { IssueStoreInterface } from '../../stores/issue_store';
import { CacheInterface } from '../../lib/cache';

import Repo from '../../models/repo';
import Issue from '../../models/issue';

import IssueItem from './issue_item';

import '../../styles/issue_list/index.css';

type RepoIssue = {|
  repo: Repo,
  issue: Issue,
|};

type Props = {|
  repoStore: RepoStoreInterface,
  issueStore: IssueStoreInterface,
  cache: CacheInterface,
|};

type State = {|
  loading: boolean,
  issues: RepoIssue[],
|}

export default class IssueList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const issues: RepoIssue[] = [];
    const cachedRepos = this.props.cache.get('/repos');

    if (cachedRepos['repos']) {
      for (let repo of cachedRepos['repos']) {
        const cachedIssues = this.props.cache.get(`/repos/${repo.name}/issues`);
        if (cachedIssues['issues']) {
          for (let issue of cachedIssues['issues']) {
            issues.push({
              repo: repo,
              issue: new Issue(issue),
            });
          }
        }
      }
    }

    issues.sort((a: RepoIssue, b: RepoIssue): number => {
      const createdAtA = a.issue.createdAt.toMillis();
      const createdAtB = b.issue.createdAt.toMillis();

      if (createdAtA < createdAtB) {
        return -1;
      }

      if (createdAtA > createdAtB) {
        return 1;
      }

      return 0;
    });

    this.state = {
      loading: issues.length === 0,
      issues: issues,
    };
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
    const promises: Promise<Issue[]>[] = [];

    for (let orgRepos: Repo[] of reposByOrg) {
      for (let repo: Repo of orgRepos) {
        repos.push(repo);

        const promise = this.props.issueStore.list(repo.name);
        promises.push(promise);
      }
    }

    const issuesByRepo = await Promise.all(promises);
    const issues: RepoIssue[] = [];

    for (let i = 0; i < issuesByRepo.length; i++) {
      const repoIssues: Issue[] = issuesByRepo[i];
      const repo: Repo = repos[i];

      this.props.cache.set(`/repos/${repo.name}/issues`, { issues: repoIssues });

      for (let issue: Issue of repoIssues) {
        issues.push({
          repo: repo,
          issue: issue,
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

    issues.sort((a: RepoIssue, b: RepoIssue): number => {
      const createdAtA = a.issue.createdAt.toMillis();
      const createdAtB = b.issue.createdAt.toMillis();

      if (createdAtA < createdAtB) {
        return -1;
      }

      if (createdAtA > createdAtB) {
        return 1;
      }

      return 0;
    });

    this.setState({ loading: false, issues: issues });
  }

  render(): Node {
    let items = (<div className='loading'>...</div>);

    if (!this.state.loading) {
      items = this.state.issues.map(i => (
        <IssueItem
          key={i.issue.id}
          issue={i.issue}
          repo={i.repo}
        />
      ));
    }

    return (
      <div className='issue-list'>
        <div className='title'>
          <h2>Open Issues</h2>
          <div className='count'>({this.state.issues.length})</div>
        </div>
        <div className='list'>
          {items}
        </div>
      </div>
    );
  }
}
