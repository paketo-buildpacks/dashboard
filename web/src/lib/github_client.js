// @flow

export type GitHubClientRequest = {
  method: string,
  path: string,
};

export type GitHubClientResponse = {
  status: number,
  data: any,
  headers: {
    link: ?string,
  },
};

type Props = {|
  token: string,
|};

export default class GitHubClient {
  token: string;

  constructor(props: Props) {
    this.token = props.token;
  }

  async do(request: GitHubClientRequest): Promise<GitHubClientResponse> {
    let url = request.path
    if (url.startsWith('/')) {
      url = `https://api.github.com${url}`;
    }

    const response = await fetch(url, {
      method: request.method,
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
    })

    const link = response.headers.get('Link');
    const data = await response.json();

    return {
      status: response.status,
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
