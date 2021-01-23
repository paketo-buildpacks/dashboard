// @flow

import { DateTime } from 'luxon';

import User from './user';

type Props = {|
  id: number,
  number: number,
  title: string,
  createdAt: string,
  url: string,
  user: User,
|};

export default class PullRequest {
  id: number;
  number: number;
  title: string;
  createdAt: DateTime;
  url: string;
  user: User;

  constructor(props: Props) {
    this.id = props.id;
    this.number = props.number;
    this.title = props.title;
    this.createdAt = DateTime.fromISO(props.createdAt);
    this.url = props.url;
    this.user = props.user;
  }
}
