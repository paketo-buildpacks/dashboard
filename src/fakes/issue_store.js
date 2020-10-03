// @flow

import Issue from '../models/issue';

type ListCall = {
  returns: {
    issues: Promise<Issue[]>,
  },
};

export default class IssueStore {
  listCall: ListCall;

  constructor() {
    this.listCall = {
      returns: {
        issues: Promise.resolve([]),
      },
    };
  }

  list(): Promise<Issue[]> {
    return this.listCall.returns.issues;
  }
}
