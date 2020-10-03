// @flow

import RepoStore from './repo_store';
import Repo from '../models/repo';
import GitHubClient from '../fakes/github_client';

describe('RepoStore', () => {
  let store: RepoStore;
  let client: GitHubClient;

  beforeEach(() => {
    client = new GitHubClient();
    store = new RepoStore({ client: client });
  });

  describe('list', () => {
    beforeEach(() => {
      client.doCall.returns.responses = [
        {
          data: [
            {
              id: 1111,
              name: "first-repo",
              full_name: "some-org/first-repo",
              html_url: "first-repo-url",
            },
            {
              id: 2222,
              name: "second-repo",
              full_name: "some-org/second-repo",
              html_url: "second-repo-url",
            },
          ],
          headers: {
            link: '</next-url>; rel="next", </last-url>; rel="last"',
          },
        },
        {
          data: [
            {
              id: 3333,
              name: "third-repo",
              full_name: "some-org/third-repo",
              html_url: "third-repo-url",
            },
            {
              id: 4444,
              name: "fourth-repo",
              full_name: "some-org/fourth-repo",
              html_url: "fourth-repo-url",
            },
          ],
          headers: {
            link: null,
          },
        }
      ]
    });

    it('returns a list of repositories', async () => {
      const repos = await store.list();

      expect(repos).toEqual([
        new Repo({
          name: "some-org/first-repo",
          url: "first-repo-url",
        }),
        new Repo({
          name: "some-org/fourth-repo",
          url: "fourth-repo-url",
        }),
        new Repo({
          name: "some-org/second-repo",
          url: "second-repo-url",
        }),
        new Repo({
          name: "some-org/third-repo",
          url: "third-repo-url",
        }),
      ]);

      expect(client.doCall.callCount).toEqual(2);
    });
  });
});
