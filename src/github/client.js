// @flow

import { Octokit } from '@octokit/rest';

export type GitHubClientRequest = {
  method: string,
  path: string,
};

export type GitHubClientResponse = {
  data: any[];
  headers: {
    link: ?string,
  },
};

interface Storage {
  getItem(key: string): ?string;
  setItem(key: string, value: string): void;
};

type Props = {
  storage: Storage,
};

export default class GitHubClient {
  storage: Storage;

  assignToken: string => void;
  authenticated: void => boolean;

  constructor(props: Props) {
    this.storage = props.storage;

    this.assignToken = this.assignToken.bind(this);
    this.authenticated = this.authenticated.bind(this);
  }

  authenticated(): boolean {
    return !!this.storage.getItem('token');
  }

  assignToken(token: string) {
    this.storage.setItem('token', token);
  }

  async do(request: GitHubClientRequest): Promise<GitHubClientResponse> {
    const octokit = new Octokit({ auth: this.storage.getItem('token') });
    const result = await octokit.request(`${request.method} ${request.path}`);

    return result;
  }
}

export interface GitHubClientInterface {
  assignToken(token: string): void;
  authenticated(): boolean;
  do(GitHubClientRequest): Promise<GitHubClientResponse>;
};
