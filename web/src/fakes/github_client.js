// @flow

import type { GitHubClientRequest, GitHubClientResponse } from '../lib/github_client';

type DoCall = {
  callCount: number,
  receives: {
    requests: GitHubClientRequest[],
  },
  returns: {
    responses: GitHubClientResponse[],
  },
}

export default class GitHubClient {
  doCall: DoCall;

  constructor() {
    this.doCall = {
      callCount: 0,
      receives: {
        requests: [],
      },
      returns: {
        responses: [],
      },
    };
  }

  do(request: GitHubClientRequest): Promise<GitHubClientResponse> {
    this.doCall.callCount++;
    this.doCall.receives.requests.push(request);

    const response = this.doCall.returns.responses[this.doCall.callCount-1] || {};

    return Promise.resolve(response);
  }
}
