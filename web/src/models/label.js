// @flow

type Props = {|
  id: number,
  name: string,
  color: string,
|};

export default class Label {
  id: number;
  name: string;
  color: string;

  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
    this.color = props.color;
  }
}
