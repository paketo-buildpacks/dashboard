// @flow

import { DateTime } from 'luxon';

import User from './user';
import Label from './label';

type Props = {|
  id: number,
  number: number,
  title: string,
  url: string,
  createdAt: string,
  commentCount: number,
  user: User,
  labels: Label[],
|};

export default class Issue {
  id: number;
  number: number;
  title: string;
  url: string;
  createdAt: DateTime;
  commentCount: number;
  user: User;
  labels: Label[];

  constructor(props: Props) {
    this.id = props.id;
    this.number = props.number;
    this.title = props.title;
    this.url = props.url;
    this.createdAt = DateTime.fromISO(props.createdAt);
    this.commentCount = props.commentCount;
    this.user = props.user;
    this.labels = props.labels || [];
  }
}
