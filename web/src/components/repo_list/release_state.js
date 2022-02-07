// @flow

import React, { type Node } from 'react';

import Repo from '../../models/repo';
import Release, { NullRelease } from '../../models/release';
import { type ReleaseStoreInterface } from '../../stores/release_store';
import { type CacheInterface } from '../../lib/cache';

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
      <div
        className='release-state'
        aria-label='release-state'
      >
        <ExternalLink
          className='tag'
          aria-label='tag'
          href={`${this.props.repo.url}/releases`}
        >
          {this.state.release.tag}
        </ExternalLink>
        <ExternalLink
          className={commitsClass}
          aria-label='commits-behind'
          href={`${this.props.repo.url}/compare/${this.state.release.tag}...main`}
        >
          {this.state.release.commitsBehind}
          <GitCommitIcon size={16} />
        </ExternalLink>
      </div>
    );
  }
}
