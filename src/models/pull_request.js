// @flow

import { DateTime } from 'luxon';

type Props = {|
  id: number,
  number: number,
  title: string,
  createdAt: string,
  url: string,
|};

export default class PullRequest {
  id: number;
  number: number;
  title: string;
  createdAt: DateTime;
  url: string;

  constructor(props: Props) {
    this.id = props.id;
    this.number = props.number;
    this.title = props.title;
    this.createdAt = DateTime.fromISO(props.createdAt);
    this.url = props.url;
  }
}
