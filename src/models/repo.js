// @flow

type Props = {|
  name: string,
  url: string,
  openIssuesCount: number,
|};

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

  isEqualTo(repo: Repo): boolean {
    return repo.name === this.name &&
      repo.url === this.url &&
      repo.openIssuesCount === this.openIssuesCount
  }
}

export default Repo;
