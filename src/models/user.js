// @flow

type Props = {|
  avatarURL: string,
|};

export default class User {
  avatarURL: string;

  constructor(props: Props) {
    this.avatarURL = props.avatarURL;
  }
}
