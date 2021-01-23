// @flow

import React, { type Node } from 'react';

import PullRequest from '../../models/pull_request';
import Repo from '../../models/repo';

import ExternalLink from '../lib/external_link';

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
        <ExternalLink className='repo' href={this.props.repo.url} >
          {this.props.repo.name}
        </ExternalLink>
        <div className='content'>
          <div className='identifier'>
            <img className='avatar' src={this.props.pullRequest.user.avatarURL} alt='user-avatar' />
            <div className='number'>#{this.props.pullRequest.number}</div>
            <ExternalLink className='title' href={this.props.pullRequest.url} >
              {this.props.pullRequest.title}
            </ExternalLink>
          </div>
        </div>
        <div className='created-at'>opened {createdAtRelative} ({createdAtDate})</div>
      </div>
    );
  }
}
