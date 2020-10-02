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
            { id: 1111, name: "first-name" },
            { id: 2222, name: "second-name" },
          ],
          headers: {
            link: '</next-url>; rel="next", </last-url>; rel="last"',
          },
        },
        {
          data: [
            { id: 3333, name: "third-name" },
            { id: 4444, name: "fourth-name" },
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
        new Repo({ id: 1111, name: "first-name" }),
        new Repo({ id: 2222, name: "second-name" }),
        new Repo({ id: 3333, name: "third-name" }),
        new Repo({ id: 4444, name: "fourth-name" }),
      ]);

      expect(client.doCall.callCount).toEqual(2);
    });
  });
});
