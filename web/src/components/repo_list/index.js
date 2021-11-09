// @flow

import React, { type Node } from 'react';

import Repo from '../../models/repo';
import RepoItem from './repo_item';
import Topic from '../../models/topic';

import { IssueStoreInterface } from '../../stores/issue_store';
import { RepoStoreInterface } from '../../stores/repo_store';
import { TopicStoreInterface } from '../../stores/topic_store';
import { PullRequestStoreInterface } from '../../stores/pull_request_store';
import { ReleaseStoreInterface } from '../../stores/release_store';
import { TimerInterface } from '../../lib/timer';
import { CacheInterface } from '../../lib/cache';

import { SyncIcon } from '@primer/octicons-react';

import '../../styles/repo_list/index.css';

type Props = {|
  repoStore: RepoStoreInterface,
  topicStore: TopicStoreInterface,
  issueStore: IssueStoreInterface,
  pullRequestStore: PullRequestStoreInterface,
  releaseStore: ReleaseStoreInterface,
  timer: TimerInterface,
  cache: CacheInterface,
|};

type State = {|
  loading: boolean,
  repos: Repo[],
  topics: Topic[],
  selectValue: string,
|};

export default class RepoList extends React.Component<Props, State> {
  handleReload: SyntheticEvent<HTMLButtonElement> => void;
  handleFilter:  SyntheticEvent<*> => void;
  interval: number;
  cacheKey: string;
  topicCacheKey: string;

  constructor(props: Props) {
    super(props);
    this.cacheKey = '/repos';
    this.topicCacheKey= '/topics';

    let repos: Repo[] = [];
    let topics: Topic[] = [];
    const result = this.props.cache.get(this.cacheKey);
    const topicResult = this.props.cache.get(this.topicCacheKey)

    if (result['repos']) {
      for (let i = 0; i < result['repos'].length; i++) {
        repos.push(new Repo(result['repos'][i]));
      }
    }

    if (topicResult['topics']) {
      for (let i = 0; i < topicResult['topics'].length; i++) {
        topics.push(new Topic(topicResult['topics'][i]));
      }
    }

    this.state = {
      loading: repos.length === 0,
      repos: repos,
      topics: topics,
      selectValue: "",
    };

    this.handleReload = this.handleReload.bind(this);
    this.handleFilter= this.handleFilter.bind(this);
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

  handleFilter(event: SyntheticEvent<*>): void {
    this.setState({selectValue: event.currentTarget.value});
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

    const topicResults = await Promise.all([
      this.props.topicStore.list(repos),
    ]);

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

    let topics: Topic[] = [];

    for (const result of topicResults) {
      for (const topic of result) {
         topics.push(topic);
      }
    }
    topics.sort((a: Topic, b: Topic): number => {
      const topicA = a.id.toUpperCase();
      const topicB = b.id.toUpperCase();

      if (topicA < topicB) {
        return -1;
      }

      if (topicA > topicB) {
        return 1;
      }

      return 0;
    });

    this.props.cache.set(this.topicCacheKey, { topics: topics });
    this.setState({ loading: false, repos: repos, topics: topics });
  }

  render(): Node {

    let items = (<div className='loading'>...</div>);
    let optionTemplate = [<option key="all" value="">All</option>];

    if (!this.state.loading) {
        items = this.state.repos
        .filter((repo) => this.state.selectValue === "" ? true : repo.topics.includes(this.state.selectValue))
        .map((repo) => (
          <RepoItem
            key={repo.id}
            repo={repo}
            issueStore={this.props.issueStore}
            pullRequestStore={this.props.pullRequestStore}
            releaseStore={this.props.releaseStore}
            cache={this.props.cache}
          />
        ));

      optionTemplate.push(this.state.topics.map((v) => (
        <option key={v.id} value={v.id}>{v.id}</option>
      )));
    }
    return (
      <div className='repo-list'>
        <div className='title'>
          <h2>Overview</h2>
          <button onClick={this.handleReload}>
            <SyncIcon size={16} />
          </button >
        </div>
        <div>
         <select key="topics" id="topics" onChange={this.handleFilter} value={this.state.selectValue}>{optionTemplate}</select>
        </div>
        <div className='list'>
          {items}
        </div>
      </div>
    );
  }
}
