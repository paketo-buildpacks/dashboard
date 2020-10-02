// @flow

type Props = {
  name: string;
};

class Repo {
  key: string;
  name: string;

  constructor(props: Props) {
    this.key = btoa(props.name);
    this.name = props.name;
  }
}

export default Repo;
