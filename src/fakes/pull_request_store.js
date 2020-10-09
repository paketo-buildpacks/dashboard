// @flow

import PullRequest from '../models/pull_request';

type ListCall = {
  returns: {
    pullRequests: Promise<PullRequest[]>,
  },
};

export default class IssueStore {
  listCall: ListCall;

  constructor() {
    this.listCall = {
      returns: {
        pullRequests: Promise.resolve([]),
      },
    };
  }

  list(): Promise<PullRequest[]> {
    return this.listCall.returns.pullRequests;
  }
}
