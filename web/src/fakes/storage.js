// @flow

export default class Storage {
  values: { [key: string]: string };

  constructor() {
    this.values = {};
  }

  getItem(key: string): ?string {
    return this.values[key] || null;
  }

  setItem(key: string, value: string): void {
    this.values[key] = value;
  }
}
