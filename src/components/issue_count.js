// @flow

import React, { type Node } from 'react';
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

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(previousProps: Props) {
    if (this.props.repo.openIssuesCount !== previousProps.repo.openIssuesCount) {
      this.load();
    }
  }

  load() {
    this.props.store.list(this.props.repo.name).then((issues) => {
      this.setState({ loading: false, issues: issues });
    });
  }

  render(): Node {
    let count: Node = '...';
    let priority: string = 'none';

    if (!this.state.loading) {
      const length = this.state.issues.length;

      if (length > 0) {
        priority = 'low';
      }

      if (length > 3) {
        priority = 'medium';
      }

      if (length > 6) {
        priority = 'high';
      }

      count = `${length}`;
    }

    return (
      <div className={`issue-count ${priority}`} aria-label='issue-count'>
        <IssueOpenedIcon size={16} />
        <div className='count'>{count}</div>
      </div>
    );
  }
}
