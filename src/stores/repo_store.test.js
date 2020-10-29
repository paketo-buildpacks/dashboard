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
              open_issues_count: 1,
            },
            {
              id: 2222,
              name: "second-repo",
              full_name: "some-org/second-repo",
              html_url: "second-repo-url",
              open_issues_count: 2,
            },
          ],
          headers: {
            link: '</orgs/some-org/repos?page=2>; rel="next", </last-url>; rel="last"',
          },
        },
        {
          data: [
            {
              id: 3333,
              name: "third-repo",
              full_name: "some-org/third-repo",
              html_url: "third-repo-url",
              open_issues_count: 3,
            },
            {
              id: 4444,
              name: "fourth-repo",
              full_name: "some-org/fourth-repo",
              html_url: "fourth-repo-url",
              open_issues_count: 4,
            },
          ],
          headers: {
            link: null,
          },
        },
      ]
    });

    it('returns a list of repositories', async () => {
      const repos = await store.list('some-org');

      expect(repos).toEqual([
        new Repo({
          name: "some-org/first-repo",
          url: "first-repo-url",
          openIssuesCount: 1,
        }),
        new Repo({
          name: "some-org/second-repo",
          url: "second-repo-url",
          openIssuesCount: 2,
        }),
        new Repo({
          name: "some-org/third-repo",
          url: "third-repo-url",
          openIssuesCount: 3,
        }),
        new Repo({
          name: "some-org/fourth-repo",
          url: "fourth-repo-url",
          openIssuesCount: 4,
        }),
      ]);

      expect(client.doCall.callCount).toEqual(2);
      expect(client.doCall.receives.requests).toHaveLength(2);
      expect(client.doCall.receives.requests[0]).toEqual({
        method: 'GET',
        path: '/orgs/some-org/repos',
      });
      expect(client.doCall.receives.requests[1]).toEqual({
        method: 'GET',
        path: '/orgs/some-org/repos?page=2',
      });
    });
  });
});
