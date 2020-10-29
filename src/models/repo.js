// @flow

type Props = {
  name: string,
  url: string,
  openIssuesCount: number,
};

class Repo {
  key: string;
  name: string;
  url: string;
  openIssuesCount: number;

  constructor(props: Props) {
    this.key = btoa(props.name);
    this.name = props.name;
    this.url = props.url;
    this.openIssuesCount = props.openIssuesCount;
  }
}

export default Repo;
