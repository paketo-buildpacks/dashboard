// @flow

export interface StorageInterface {
  getItem(key: string): ?string;
  setItem(key: string, value: string): void;
};
