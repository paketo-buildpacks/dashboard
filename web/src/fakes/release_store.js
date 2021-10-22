// @flow

import Release from '../models/release';

type LatestCall = {|
  callCount: number,
  receives: {|
    repo: string,
  |},
  returns: {|
    promise: Promise<Release>,
  |},
|};

export default class ReleaseStore {
  latestCall: LatestCall;

  constructor() {
    this.latestCall = {
      callCount: 0,
      receives: {
        repo: '',
      },
      returns: {
        promise: new Promise((res, rej) => {}),
      },
    };
  }

  latest(repo: string): Promise<Release> {
    this.latestCall.callCount++;
    this.latestCall.receives.repo = repo;

    return this.latestCall.returns.promise;
  }
}
