// @flow

import React, { type Node } from 'react';

import Repo from '../../models/repo';
import Release, { NullRelease } from '../../models/release';
import { ReleaseStoreInterface } from '../../stores/release_store';
import { CacheInterface } from '../../lib/cache';

import ExternalLink from '../lib/external_link';
import { GitCommitIcon } from '@primer/octicons-react';

import '../../styles/repo_list/release_state.css';

type Props = {|
  repo: Repo,
  releaseStore: ReleaseStoreInterface,
  cache: CacheInterface,
|};

type State = {|
  release: Release,
|}

export default class ReleaseState extends React.Component<Props, State> {
  cacheKey: string;

  constructor(props: Props) {
    super(props);

    this.cacheKey = `/repos/${this.props.repo.name}/releases/latest`;

    let release: Release = NullRelease;
    const cachedRelease = this.props.cache.get(this.cacheKey);
    if (cachedRelease['release']) {
      release = new Release(cachedRelease['release']);
    }

    this.state = {
      release: release,
    };
  }

  componentDidMount() {
    this.load();
  }

  async load() {
    const release = await this.props.releaseStore.latest(this.props.repo.name);

    this.props.cache.set(this.cacheKey, { release: release });
    this.setState({ release: release });
  }

  render(): Node {
    let commitsClass = 'commits-behind';

    if (this.state.release.commitsBehind > 0) {
      commitsClass += ' behind';
    }

    return (
      <ExternalLink
        className='release-state'
        href={`${this.props.repo.url}/releases`}
        aria-label='release-state'
      >
        <div className='tag' aria-label='tag'>
          {this.state.release.tag}
        </div>
        <div className={commitsClass} aria-label='commits-behind'>
          {this.state.release.commitsBehind}
          <GitCommitIcon size={16} />
        </div>
      </ExternalLink>
    );
  }
}
