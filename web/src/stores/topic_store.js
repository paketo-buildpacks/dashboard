// @flow

import Topic from '../models/topic';
import Repo from '../models/repo';

type Props = {||};

export default class TopicStore {
  props: Props;

  constructor(props: Props) {
    this.props = props;
  }

  async list(repos: Repo[]): Promise<Topic[]> {
    // let topics: Topic[] = [];
    // let repos: Repo[] = [];

    const topicMap = new Map();

    for (const repo of repos) {
      for (const topic of repo.topics) {
        let repos = [];
        if (topicMap.has(topic)) {
          repos = topicMap.get(topic)
        }

        // have to wrap push/set in this if statement
        // to appease Flow's static checker
        if (repos) {
         repos.push(repo.name);
         topicMap.set(topic, repos);
        }
      }
    }

    let topics: Topic[] = [];
    for (const entry of topicMap.entries()) {
      topics.push(new Topic({
        id: entry[0],
        repos: entry[1],
      }));
    }
    return topics;
  }
}

export interface TopicStoreInterface {
  list(repos: Repo[]): Promise<Topic[]>;
};
