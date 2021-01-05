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

  isEqualTo(repo: Repo): boolean {
    return repo.name === this.name &&
      repo.url === this.url &&
      repo.openIssuesCount === this.openIssuesCount
  }
}

export default Repo;
