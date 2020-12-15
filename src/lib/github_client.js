// @flow

import { StorageInterface } from '../lib/storage';

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

type Props = {|
  storage: StorageInterface,
|};

export default class GitHubClient {
  storage: StorageInterface;
  worker: {
    do: (token: ?string, method: string, path: string) => Promise<GitHubClientResponse>
  };

  constructor(props: Props) {
    this.storage = props.storage;
  }

  async do(request: GitHubClientRequest): Promise<GitHubClientResponse> {
    const token = this.storage.getItem('token') || '';

    let url = request.path
    if (url.startsWith('/')) {
      url = `https://api.github.com${url}`;
    }

    const response = await fetch(url, {
      method: request.method,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    const link = response.headers.get('Link');
    const data = await response.json();

    return {
      data: data,
      headers: {
        link: link,
      },
    };
  }
}

export interface GitHubClientInterface {
  do(GitHubClientRequest): Promise<GitHubClientResponse>;
};
