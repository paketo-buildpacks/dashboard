// @flow

import Repo from '../models/repo';
import { type GitHubClientInterface, type GitHubClientResponse } from '../lib/github_client';

type Props = {|
  client: GitHubClientInterface,
|};

export default class RepoStore {
  props: Props;

  constructor(props: Props) {
    this.props = props;
  }

  async list(org: string): Promise<Repo[]> {
    let repos: Repo[] = [];
    let path: string = `/orgs/${org}/repos`;

    while (path) {
      const response: GitHubClientResponse = await this.props.client.do({
        method: 'GET',
        path: path
      });

      for (const repo of response.data) {
        if(repo.archived) {
          continue;
        }
        repos.push(new Repo({
          id: repo.id,
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
