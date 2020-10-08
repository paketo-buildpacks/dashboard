// @flow

import type { GitHubClientRequest, GitHubClientResponse } from '../github/client';

type AuthenticatedCall = {
  returns: {
    boolean: boolean,
  },
};

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
  assignToken: string => void;
  authenticatedCall: AuthenticatedCall;
  doCall: DoCall;

  constructor() {
    this.authenticatedCall = {
      returns: {
        boolean: false,
      },
    };
    this.doCall = {
      callCount: 0,
      receives: {
        requests: [],
      },
      returns: {
        responses: [],
      },
    };

    this.assignToken = this.assignToken.bind(this);
  }

  authenticated(): boolean {
    return this.authenticatedCall.returns.boolean;
  }

  assignToken(token: string): void {
    if (token !== '') {
      this.authenticatedCall.returns.boolean = true;
    }
  }

  do(request: GitHubClientRequest): Promise<GitHubClientResponse> {
    this.doCall.callCount++;
    this.doCall.receives.requests.push(request);

    const response = this.doCall.returns.responses[this.doCall.callCount-1] || {};

    return Promise.resolve(response);
  }
}
