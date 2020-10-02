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

export default class GitHubClient {
  token: string;
  assignToken: string => void;
  authenticated: void => boolean;

  constructor() {
    this.token = '';

    this.assignToken = this.assignToken.bind(this);
    this.authenticated = this.authenticated.bind(this);
  }

  authenticated(): boolean {
    return this.token !== '';
  }

  assignToken(token: string) {
    this.token = token;
  }

  async do(request: GitHubClientRequest): Promise<GitHubClientResponse> {
    const octokit = new Octokit({ auth: this.token });
    const result = await octokit.request(`${request.method} ${request.path}`);

    return result;
  }
}
