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

  async list(): Promise<Repo[]> {
    let repos: Repo[] = [];

    for (const org of ['paketo-buildpacks', 'paketo-community']) {
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
          }));
        }

        path = ((response.headers.link || "").match( /<([^>]+)>;\s*rel="next"/) || [])[1];
      }
    }

    repos.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      if (nameA < nameB) {
        return -1;
      }

      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    return repos;
  }
}

export interface RepoStoreInterface {
  list(): Promise<Repo[]>;
};
