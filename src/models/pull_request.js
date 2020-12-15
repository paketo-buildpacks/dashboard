// @flow

type Props = {|
  number: number,
|};

export default class PullRequest {
  number: number;

  constructor(props: Props) {
    this.number = props.number;
  }
}
