// @flow

import Repo from '../models/repo';
import { GitHubClientInterface, type GitHubClientResponse } from '../github/client';

type Props = {
  client: GitHubClientInterface,
};

export default class RepoStore {
  client: GitHubClientInterface;

  constructor(props: Props) {
    this.client = props.client;
  }

  async list(org: string): Promise<Repo[]> {
    let repos: Repo[] = [];
    let path: string = `/orgs/${org}/repos`;

    while (path) {
      const response: GitHubClientResponse = await this.client.do({
        method: 'GET',
        path: path
      });

      for (const repo of response.data) {
        repos.push(new Repo({
          name: repo.full_name,
          url: repo.html_url,
          openIssuesCount: repo.open_issues_count,
        }));
      }

      path = ((response.headers.link || "").match( /<([^>]+)>;\s*rel="next"/) || [])[1];
    }

    return repos;
  }
}

export interface RepoStoreInterface {
  list(org: string): Promise<Repo[]>;
};
