// @flow

export default class Cache {
  values: { [key: string]: {} };

  constructor() {
    this.values = {};
  }

  get(key: string): {} {
    return this.values[key] || {};
  }

  set(key: string, value: {}): void {
    this.values[key] = value;
  }
}
