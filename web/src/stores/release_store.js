// @flow

import Release, { NullRelease } from '../models/release';
import { type GitHubClientInterface, type GitHubClientResponse } from '../lib/github_client';

type Props = {|
  client: GitHubClientInterface,
|};

export default class ReleaseStore {
  client: GitHubClientInterface;

  constructor(props: Props) {
    this.client = props.client;
  }

  async latest(repo: string): Promise<Release> {
    let response: GitHubClientResponse = await this.client.do({
      method: 'GET',
      path: `/repos/${repo}/releases/latest`,
    });

    let release = NullRelease;
    if (response.status === 200) {
      const tagName = (response.data: { [string]: any })['tag_name'];
      const createdAt = (response.data: { [string]: any })['created_at'];

      response = await this.client.do({
        method: 'GET',
        path: `/repos/${repo}/compare/main...${tagName}`,
      });

      const behindBy = (response.data: { [string]: any })['behind_by'];

      release = new Release({
        tag: tagName,
        commitsBehind: behindBy,
        createdAt: createdAt,
      });
    }

    return release;
  }
}

export interface ReleaseStoreInterface {
  latest(repo: string): Promise<Release>;
}
