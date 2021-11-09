// @flow

import TopicStore from './topic_store';
import Topic from '../models/topic';
import Repo from '../models/repo';

describe('TopicStore', () => {
  let store: TopicStore;

  beforeEach(() => {
    store = new TopicStore({});
  });

  describe('list', () => {
    beforeEach(() => {});
    it('returns a list of repositories', async () => {
      const repo = new Repo({
          id: 1111,
          name: "some-org/first-repo",
          url: "first-repo-url",
          openIssuesCount: 1,
          topics: ["first-language", "other-topic"],
      });
      
      const repo2 = new Repo({
          id: 2222,
          name: "some-org/second-repo",
          url: "second-repo-url",
          openIssuesCount: 2,
          topics: ["second-language", "other-topic"],
      });

      const repo3 = new Repo({
          id: 3333,
          name: "some-org/third-repo",
          url: "third-repo-url",
          openIssuesCount: 3,
          topics: ["other-topic"],
        });

      const repos: Repo[] = [repo, repo2, repo3];
      const topics = await store.list(repos);

      expect(topics).toEqual([
        new Topic({
          id: "first-language",
          repos: ["some-org/first-repo"],
        }),
        new Topic({
          id: "other-topic",
          repos: ["some-org/first-repo", "some-org/second-repo", "some-org/third-repo"],
        }),
        new Topic({
          id: "second-language",
          repos: ["some-org/second-repo"],
        }),
      ]);
    });
  });
});
