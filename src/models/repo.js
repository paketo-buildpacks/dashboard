// @flow

type Props = {
  name: string,
  url: string,
};

class Repo {
  key: string;
  name: string;
  url: string;

  constructor(props: Props) {
    this.key = btoa(props.name);
    this.name = props.name;
    this.url = props.url;
  }
}

export default Repo;
