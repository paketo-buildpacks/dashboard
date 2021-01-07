// @flow

import React, { type Node } from 'react';

import PullRequest from '../../models/pull_request';
import Repo from '../../models/repo';

import '../../styles/pull_request_list/pull_request_item.css';

type Props = {|
  pullRequest: PullRequest,
  repo: Repo,
|};

export default class PullRequestItem extends React.Component<Props> {
  render(): Node {
    const createdAtRelative = this.props.pullRequest.createdAt.toRelative();
    const createdAtDate = this.props.pullRequest.createdAt.toLocaleString({ month: 'short', day: 'numeric', year: 'numeric' });

    return (
      <div className='pull-request-item'>
        <a
          className='repo'
          href={this.props.repo.url}
          target='_blank'
          rel='noopener noreferrer'
        >{this.props.repo.name}</a>
        <div className='content'>
          <div className='identifier'>
            <div className='number'>#{this.props.pullRequest.number}</div>
            <a
              className='title'
              href={this.props.pullRequest.url}
              target='_blank'
              rel='noopener noreferrer'
            >{this.props.pullRequest.title}</a>
          </div>
        </div>
        <div className='created-at'>opened {createdAtRelative} ({createdAtDate})</div>
      </div>
    );
  }
}
