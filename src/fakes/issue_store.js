// @flow

import Issue from '../models/issue';

type ListCall = {
  callCount: number,
  returns: {
    promises: Promise<Issue[]>[],
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

  list(): Promise<Issue[]> {
    this.listCall.callCount++;

    let promise: Promise<Issue[]> = Promise.resolve([]);

    if (this.listCall.returns.promises[this.listCall.callCount-1]) {
      promise = this.listCall.returns.promises[this.listCall.callCount-1]
    }

    return promise;
  }
}
