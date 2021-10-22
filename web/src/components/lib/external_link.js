// @flow

import React, { type Node } from 'react';

type Props = {|
  href: string,
  children: Node,

  className?: string,
  'aria-label'?: string,
|};

export default class ExternalLink extends React.Component<Props> {
  render(): Node {
    return (
      <a
        className={this.props.className}
        aria-label={this.props['aria-label']}
        href={this.props.href}
        target='_blank'
        rel='noopener noreferrer'
      >
        {this.props.children}
      </a>
    );
  }
}
