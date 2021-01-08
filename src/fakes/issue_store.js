// @flow

import Issue from '../models/issue';

type ListCall = {|
  callCount: number,
  receives: {|
    repo: string,
  |},
  returns: {|
    promises: Promise<Issue[]>[],
  |},
|};

export default class IssueStore {
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

  list(repo: string): Promise<Issue[]> {
    this.listCall.callCount++;

    this.listCall.receives.repo = repo;

    let promise: Promise<Issue[]> = Promise.resolve([]);

    if (this.listCall.returns.promises[this.listCall.callCount-1]) {
      promise = this.listCall.returns.promises[this.listCall.callCount-1]
    }

    return promise;
  }
}
