// @flow

import React from 'react';
import type { Node } from 'react';
import '../styles/issue_count.css';
import Issue from '../models/issue';
import Repo from '../models/repo';
import { IssueStoreInterface } from '../stores/issue_store';
import { IssueOpenedIcon } from '@primer/octicons-react';

type Props = {
  store: IssueStoreInterface,
  repo: Repo,
};

type State = {
  loading: boolean,
  issues: Issue[],
};

export default class IssueCount extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: true,
      issues: [],
    };
  }

  async componentDidMount() {
    const issues = await this.props.store.list(this.props.repo.name);

    this.setState({ loading: false, issues: issues });
  }

  render(): Node {
    let count: string = 'Loading...';

    if (!this.state.loading) {
      count = `${this.state.issues.length}`;
    }

    return (
      <div className="issue-count" aria-label="issue-count">
        <IssueOpenedIcon size={16} />
        <div className="count">{count}</div>
      </div>
    );
  }
}
