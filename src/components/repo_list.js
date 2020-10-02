// @flow

import React from 'react';
import type { Node } from 'react';
import Repo from '../models/repo';
import RepoItem from './repo_item';

interface Store {
  list(): Promise<Repo[]>;
};

type Props = {
  store: Store,
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
    let items = "Loading...";

    if (!this.state.loading) {
      items = this.state.repos.map((repo) => (
        <RepoItem key={repo.key} repo={repo} />
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
