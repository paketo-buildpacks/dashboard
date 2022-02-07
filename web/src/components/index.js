// @flow

import React from 'react';
import type { Node } from 'react';
import { Switch, Route } from 'react-router-dom';

import '../styles/app.css';

import Header from './header';
import RepoList from './repo_list';
import IssueList from './issue_list';
import PullRequestList from './pull_request_list';

import { type RepoStoreInterface } from '../stores/repo_store';
import { type IssueStoreInterface } from '../stores/issue_store';
import { type PullRequestStoreInterface } from '../stores/pull_request_store';
import { type ReleaseStoreInterface } from '../stores/release_store';
import { type TimerInterface } from '../lib/timer';
import { type CacheInterface } from '../lib/cache';
import { type StorageInterface } from '../lib/storage';

type Props = {|
  repoStore: RepoStoreInterface,
  issueStore: IssueStoreInterface,
  pullRequestStore: PullRequestStoreInterface,
  releaseStore: ReleaseStoreInterface,
  timer: TimerInterface,
  cache: CacheInterface,
  storage: StorageInterface,
|};

class App extends React.Component<Props> {
  render(): Node {
    let root = '';
    if (process.env.PUBLIC_URL) {
      root = process.env.PUBLIC_URL;
    }

    return (
      <div className="app">
        <Header />
        <section className="body">
          <Switch>

            <Route path={`${root}/issues`}>
              <IssueList
                cache={this.props.cache}
                repoStore={this.props.repoStore}
                issueStore={this.props.issueStore}
              />
            </Route>

            <Route path={`${root}/pull-requests`}>
              <PullRequestList
                cache={this.props.cache}
                repoStore={this.props.repoStore}
                pullRequestStore={this.props.pullRequestStore}
              />
            </Route>

            <Route path={`${root}/`}>
              <RepoList
                repoStore={this.props.repoStore}
                issueStore={this.props.issueStore}
                pullRequestStore={this.props.pullRequestStore}
                releaseStore={this.props.releaseStore}
                timer={this.props.timer}
                cache={this.props.cache}
              />
            </Route>

          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
