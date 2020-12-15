// @flow

import Issue from '../models/issue';
import { GitHubClientInterface, type GitHubClientResponse } from '../lib/github_client';

type Props = {|
  client: GitHubClientInterface,
|};

export default class IssueStore {
  client: GitHubClientInterface;

  constructor(props: Props) {
    this.client = props.client;
  }

  async list(repo: string): Promise<Issue[]> {
    let path: string = `/repos/${repo}/issues`;
    let issues: Issue[] = [];

    while (path) {
      const response: GitHubClientResponse = await this.client.do({
        method: 'GET',
        path: path,
      });

      for (const issue of response.data) {
        if (!issue.pull_request) {
          issues.push(new Issue({
            number: issue.number,
          }));
        }
      }

      path = ((response.headers.link || "").match( /<([^>]+)>;\s*rel="next"/) || [])[1];
    }

    return issues;
  }
};

export interface IssueStoreInterface {
  list(repo: string): Promise<Issue[]>;
};
