// @flow

import { StorageInterface } from './storage';

type Props = {|
  storage: StorageInterface,
|};

export default class Cache {
  props: Props;

  constructor(props: Props) {
    this.props = props;
  }

  set(key: string, value: { [key: string]: any}): void {
    key = this._key(key);

    this.props.storage.setItem(key, JSON.stringify(value));
  }

  get(key: string): { [key: string]: any} {
    key = this._key(key);

    const value = this.props.storage.getItem(key);

    if (!value) {
      return {};
    }

    return JSON.parse(value);
  }

  _key(key: string): string {
    key = key.replace(/^(\/)/,"");
    return `/cache/${key}`;
  }
}

export interface CacheInterface {
  get(key: string): { [key: string]: any};
  set(key: string, value: { [key: string]: any}): void;
}
