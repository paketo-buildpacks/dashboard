// @flow

export interface TimerInterface {
  setInterval(callback: () => mixed, interval: number): number;
  clearInterval(id: number): void;
};
