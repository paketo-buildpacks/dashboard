// @flow

import PullRequest from '../models/pull_request';

type ListCall = {
  callCount: number,
  returns: {
    promises: Promise<PullRequest[]>[],
  },
};

export default class IssueStore {
  listCall: ListCall;

  constructor() {
    this.listCall = {
      callCount: 0,
      returns: {
        promises: [],
      },
    };
  }

  list(): Promise<PullRequest[]> {
    this.listCall.callCount++;

    let promise: Promise<PullRequest[]> = Promise.resolve([]);

    if (this.listCall.returns.promises[this.listCall.callCount-1]) {
      promise = this.listCall.returns.promises[this.listCall.callCount-1]
    }

    return promise;
  }
}
