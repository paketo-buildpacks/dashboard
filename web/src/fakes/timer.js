// @flow

type SetIntervalCall = {
  callCount: number,
  receives: {
    callback: () => mixed,
    interval: number,
  },
  returns: {
    id: number,
  },
};

type ClearIntervalCall = {
  callCount: number,
  receives: {
    id: number,
  },
};

export default class Timer {
  setIntervalCall: SetIntervalCall;
  clearIntervalCall: ClearIntervalCall;

  constructor() {
    this.setIntervalCall = {
      callCount: 0,
      receives: {
        callback: () => {},
        interval: 0,
      },
      returns: {
        id: 0,
      },
    };

    this.clearIntervalCall = {
      callCount: 0,
      receives: {
        id: 0,
      },
    };
  }

  setInterval(callback: () => mixed, interval: number): number {
    this.setIntervalCall.callCount++;

    this.setIntervalCall.receives.callback = callback;
    this.setIntervalCall.receives.interval = interval;

    return this.setIntervalCall.returns.id;
  }

  clearInterval(id: number): void {
    this.clearIntervalCall.callCount++;

    this.clearIntervalCall.receives.id = id;
  }
}
