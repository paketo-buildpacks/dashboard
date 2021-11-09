// @flow

// import Repo from './repo';

type Props = {|
  id: string,
  repos: string[],
|};

class Topic {
  id: string;
  repos: string[];

  constructor(props: Props) {
    this.id = props.id;
    this.repos = props.repos;
  }
}

export default Topic;
