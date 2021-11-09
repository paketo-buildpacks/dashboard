// @flow

import Topic from '../models/topic';
import Repo from '../models/repo';

type ListCall = {
  callCount: number,
  receives: {|
    repos: Repo[],
  |},
  returns: {|
    promises: Promise<Topic[]>[],
  |},
};

export default class PullRequestStore {
  listCall: ListCall;

  constructor() {
    this.listCall = {
      callCount: 0,
      receives: {
        repos: [],
      },
      returns: {
        promises: [],
      },
    };
  }

  list(repos: Repo[]): Promise<Topic[]> {
    this.listCall.callCount++;
    this.listCall.receives.repos = repos;

    let promise: Promise<Topic[]> = Promise.resolve([]);

    if (this.listCall.returns.promises[this.listCall.callCount-1]) {
      promise = this.listCall.returns.promises[this.listCall.callCount-1]
    }

    return promise;
  }
}
