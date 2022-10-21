// @flow

type Props = {|
  tag: string,
  commitsBehind: number,
  createdAt?: Date,
|};

export default class Release {
  tag: string;
  commitsBehind: number;
  createdAt: ?Date;

  constructor(props: Props) {
    this.tag = props.tag;
    this.commitsBehind = props.commitsBehind;
    this.createdAt = props.createdAt;
  }
}

export const NullRelease: Release = new Release({
  tag: '—',
  commitsBehind: 0,
});
