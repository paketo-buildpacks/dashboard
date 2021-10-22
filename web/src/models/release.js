// @flow

type Props = {|
  tag: string,
  commitsBehind: number,
|};

export default class Release {
  tag: string;
  commitsBehind: number;

  constructor(props: Props) {
    this.tag = props.tag;
    this.commitsBehind = props.commitsBehind;
  }
}

export const NullRelease: Release = new Release({
  tag: '—',
  commitsBehind: 0,
});
