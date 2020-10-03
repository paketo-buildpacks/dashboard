// @flow

import Repo from '../models/repo';

type ListCall = {
  returns: {
    repos: Promise<Repo[]>,
  },
};

export default class RepoStore {
  listCall: ListCall;

  constructor() {
    this.listCall = {
      returns: {
        repos: Promise.resolve([]),
      },
    };
  }

  list(): Promise<Repo[]> {
    return this.listCall.returns.repos;
  }
}
