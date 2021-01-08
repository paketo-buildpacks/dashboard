// @flow

import PullRequest from '../models/pull_request';

type ListCall = {
  callCount: number,
  receives: {|
    repo: string,
  |},
  returns: {|
    promises: Promise<PullRequest[]>[],
  |},
};

export default class PullRequestStore {
  listCall: ListCall;

  constructor() {
    this.listCall = {
      callCount: 0,
      receives: {
        repo: '',
      },
      returns: {
        promises: [],
      },
    };
  }

  list(repo: string): Promise<PullRequest[]> {
    this.listCall.callCount++;
    this.listCall.receives.repo = repo;

    let promise: Promise<PullRequest[]> = Promise.resolve([]);

    if (this.listCall.returns.promises[this.listCall.callCount-1]) {
      promise = this.listCall.returns.promises[this.listCall.callCount-1]
    }

    return promise;
  }
}
