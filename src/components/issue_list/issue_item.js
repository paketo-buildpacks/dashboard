// @flow

import React, { type Node } from 'react';

import Issue from '../../models/issue';
import Repo from '../../models/repo';

import ExternalLink from '../lib/external_link';
import LabelItem from '../lib/label_item';
import { CommentIcon } from '@primer/octicons-react';

import '../../styles/issue_list/issue_item.css';

type Props = {|
  issue: Issue,
  repo: Repo,
|};

export default class IssueItem extends React.Component<Props> {
  render(): Node {
    const createdAtRelative = this.props.issue.createdAt.toRelative();
    const createdAtDate = this.props.issue.createdAt.toLocaleString({ month: 'short', day: 'numeric', year: 'numeric' });

    let commentCountClass = 'comment-count'
    if (this.props.issue.commentCount === 0) {
      commentCountClass += ' none';
    }

    const labels: Node = this.props.issue.labels.map(l => (
      <LabelItem key={l.id} label={l} />
    ));

    return (
      <div className='issue-item'>
        <ExternalLink className='repo' href={this.props.repo.url} >
          {this.props.repo.name}
        </ExternalLink>
        <div className='content'>
          <div className='identifier'>
            <img className='avatar' src={this.props.issue.user.avatarURL} alt='user-avatar' />
            <div className='number'>#{this.props.issue.number}</div>
            <ExternalLink className='title' href={this.props.issue.url} >
              {this.props.issue.title}
            </ExternalLink>
            {labels}
          </div>
          <div className={commentCountClass} aria-label='comment-count'>
            <div className='count'>{this.props.issue.commentCount}</div>
            <CommentIcon size={16} />
          </div>
        </div>
        <div className='created-at'>opened {createdAtRelative} ({createdAtDate})</div>
      </div>
    );
  }
}
