// @flow

import Repo from '../models/repo';

type ListCall = {
  callCount: number,
  returns: {
    promises: Promise<Repo[]>[],
  },
};

export default class RepoStore {
  listCall: ListCall;

  constructor() {
    this.listCall = {
      callCount: 0,
      returns: {
        promises: [],
      },
    };
  }

  list(): Promise<Repo[]> {
    this.listCall.callCount++;

    let promise: Promise<Repo[]> = Promise.resolve([]);

    if (this.listCall.returns.promises[this.listCall.callCount-1]) {
      promise = this.listCall.returns.promises[this.listCall.callCount-1]
    }

    return promise;
  }
}
