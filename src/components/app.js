// @flow

import React from 'react';
import type { Node } from 'react';

import '../styles/app.css';

import Header from './header';
import Login from './login';
import RepoList from './repo_list';

import { GitHubClientInterface } from '../github/client';
import { RepoStoreInterface } from '../stores/repo_store';
import { IssueStoreInterface } from '../stores/issue_store';
import { PullRequestStoreInterface } from '../stores/pull_request_store';

type Props = {
  gitHubClient: GitHubClientInterface,
  repoStore: RepoStoreInterface,
  issueStore: IssueStoreInterface,
  pullRequestStore: PullRequestStoreInterface,
};

type State = {
  authenticated: boolean,
};

class App extends React.Component<Props, State> {
  assignToken: string => void;

  constructor(props: Props) {
    super(props);

    this.state = { authenticated: this.props.gitHubClient.authenticated() };

    this.assignToken = this.assignToken.bind(this);
  }

  assignToken(token: string): void {
    this.props.gitHubClient.assignToken(token);
    this.setState({ authenticated: this.props.gitHubClient.authenticated() });
  }

  render(): Node {
    let body = <Login assignToken={this.assignToken} />;

    if (this.state.authenticated) {
      body = <RepoList
        store={this.props.repoStore}
        issueStore={this.props.issueStore}
        pullRequestStore={this.props.pullRequestStore}
      />
    }

    return (
      <div className="app">
        <Header />
        <section className="body">
          {body}
        </section>
      </div>
    );
  }
}

export default App;
