// @flow

import Repo from '../models/repo';
import type { GitHubClientRequest, GitHubClientResponse } from '../github/client';

interface Client {
  do(GitHubClientRequest): Promise<GitHubClientResponse>;
};

type Props = {
  client: Client,
};

export default class RepoStore {
  client: Client;

  constructor(props: Props) {
    this.client = props.client;
  }

  async list(): Promise<Repo[]> {
    let path: string = '/orgs/paketo-buildpacks/repos';

    let repos: Repo[] = [];

    while (path) {
      const response: GitHubClientResponse = await this.client.do({
        method: 'GET',
        path: path
      });

      for (const repo of response.data) {
        repos.push(new Repo({
          key: repo.id,
          name: repo.name,
        }));
      }

      path = ((response.headers.link || "").match( /<([^>]+)>;\s*rel="next"/) || [])[1];
    }

    return repos;
  }
}
