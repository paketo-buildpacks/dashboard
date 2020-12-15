// @flow

import PullRequest from '../models/pull_request';
import { GitHubClientInterface, type GitHubClientResponse } from '../lib/github_client';

type Props = {|
  client: GitHubClientInterface,
|};

export default class PullRequestStore {
  client: GitHubClientInterface;

  constructor(props: Props) {
    this.client = props.client;
  }

  async list(repo: string): Promise<PullRequest[]> {
    let path: string = `/repos/${repo}/pulls`;
    let pullRequests: PullRequest[] = [];

    while (path) {
      const response: GitHubClientResponse = await this.client.do({
        method: 'GET',
        path: path,
      });

      for (const pullRequest of response.data) {
        pullRequests.push(new PullRequest({
          number: pullRequest.number,
        }));
      }

      path = ((response.headers.link || "").match( /<([^>]+)>;\s*rel="next"/) || [])[1];
    }

    return pullRequests;
  }
};

export interface PullRequestStoreInterface {
  list(repo: string): Promise<PullRequest[]>;
};
