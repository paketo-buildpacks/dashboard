// @flow

import Issue from '../models/issue';
import User from '../models/user';
import Label from '../models/label';

import { type GitHubClientInterface, type GitHubClientResponse } from '../lib/github_client';

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
          const labels: Label[] = [];
          for (const label of issue.labels) {
            labels.push(new Label({
              id: label.id,
              name: label.name,
              color: label.color,
            }));
          }

          issues.push(new Issue({
            id: issue.id,
            number: issue.number,
            title: issue.title,
            url: issue.html_url,
            createdAt: issue.created_at,
            commentCount: issue.comments,
            user: new User({
              avatarURL: issue.user.avatar_url,
            }),
            labels: labels,
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
