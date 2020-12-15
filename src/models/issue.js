// @flow

type Props = {|
  number: number,
|};

export default class Issue {
  number: number;

  constructor(props: Props) {
    this.number = props.number;
  }
}
