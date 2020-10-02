// @flow

import React from 'react';
import type { Node } from 'react';
import '../styles/app.css';
import Header from './header';
import Login from './login';
import RepoList from './repo_list';
import Repo from '../models/repo';

interface RepoStore {
  list(): Promise<Repo[]>;
};

interface GitHubClient {
  assignToken(token: string): void;
  authenticated(): boolean;
};

type Props = {
  repoStore: RepoStore,
  gitHubClient: GitHubClient,
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
      body = <RepoList store={this.props.repoStore} />
    }

    return (
      <div className="app">
        <Header />
        {body}
      </div>
    );
  }
}

export default App;
