// @flow

import { DateTime } from 'luxon';

type Props = {|
  id: number,
  number: number,
  title: string,
  url: string,
  createdAt: string,
  commentCount: number,
|};

export default class Issue {
  id: number;
  number: number;
  title: string;
  url: string;
  createdAt: DateTime;
  commentCount: number;

  constructor(props: Props) {
    this.id = props.id;
    this.number = props.number;
    this.title = props.title;
    this.url = props.url;
    this.createdAt = DateTime.fromISO(props.createdAt);
    this.commentCount = props.commentCount;
  }
}
