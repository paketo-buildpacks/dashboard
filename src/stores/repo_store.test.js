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
              full_name: "paketo-buildpacks/first-repo",
              html_url: "first-repo-url",
            },
            {
              id: 2222,
              name: "second-repo",
              full_name: "paketo-buildpacks/second-repo",
              html_url: "second-repo-url",
            },
          ],
          headers: {
            link: '</orgs/paketo-buildpacks/repos?page=2>; rel="next", </last-url>; rel="last"',
          },
        },
        {
          data: [
            {
              id: 3333,
              name: "third-repo",
              full_name: "paketo-buildpacks/third-repo",
              html_url: "third-repo-url",
            },
            {
              id: 4444,
              name: "fourth-repo",
              full_name: "paketo-buildpacks/fourth-repo",
              html_url: "fourth-repo-url",
            },
          ],
          headers: {
            link: null,
          },
        },
        {
          data: [
            {
              id: 5555,
              name: "fifth-repo",
              full_name: "paketo-community/fifth-repo",
              html_url: "fifth-repo-url",
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
          name: "paketo-buildpacks/first-repo",
          url: "first-repo-url",
        }),
        new Repo({
          name: "paketo-buildpacks/fourth-repo",
          url: "fourth-repo-url",
        }),
        new Repo({
          name: "paketo-buildpacks/second-repo",
          url: "second-repo-url",
        }),
        new Repo({
          name: "paketo-buildpacks/third-repo",
          url: "third-repo-url",
        }),
        new Repo({
          name: "paketo-community/fifth-repo",
          url: "fifth-repo-url",
        }),
      ]);

      expect(client.doCall.callCount).toEqual(3);
      expect(client.doCall.receives.requests).toHaveLength(3);
      expect(client.doCall.receives.requests[0]).toEqual({
        method: 'GET',
        path: '/orgs/paketo-buildpacks/repos',
      });
      expect(client.doCall.receives.requests[1]).toEqual({
        method: 'GET',
        path: '/orgs/paketo-buildpacks/repos?page=2',
      });
      expect(client.doCall.receives.requests[2]).toEqual({
        method: 'GET',
        path: '/orgs/paketo-community/repos',
      });
    });
  });
});
