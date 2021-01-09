// @flow

type Props = {|
  id: number,
  name: string,
  url: string,
  openIssuesCount: number,
|};

class Repo {
  id: number;
  name: string;
  url: string;
  openIssuesCount: number;

  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
    this.url = props.url;
    this.openIssuesCount = props.openIssuesCount;
  }
}

export default Repo;
