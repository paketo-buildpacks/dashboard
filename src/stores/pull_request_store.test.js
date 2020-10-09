// @flow

import PullRequestStore from './pull_request_store';
import GitHubClient from '../fakes/github_client';
import PullRequest from '../models/pull_request';

describe('PullRequestStore', () => {
  let store: PullRequestStore;
  let client: GitHubClient;

  beforeEach(() => {
    client = new GitHubClient();
    store = new PullRequestStore({ client: client });
  });

  describe('list', () => {
    beforeEach(() => {
      client.doCall.returns.responses = [
        {
          data: [
            {
              number: 1,
            },
            {
              number: 2,
            },
          ],
          headers: {
            link: '</repos/some-org/some-repo/pulls?page=2>; rel="next", </last-url>; rel="last"',
          },
        },
        {
          data: [
            {
              number: 3,
            },
          ],
          headers: {
            link: null,
          },
        },
      ];
    });

    it('returns a list of pull requests', async () => {
      const pullRequests = await store.list('some-org/some-repo');

      expect(pullRequests).toEqual([
        new PullRequest({ number: 1 }),
        new PullRequest({ number: 2 }),
        new PullRequest({ number: 3 }),
      ]);

      expect(client.doCall.callCount).toEqual(2);
      expect(client.doCall.receives.requests).toHaveLength(2);
      expect(client.doCall.receives.requests[0]).toEqual({
        method: 'GET',
        path: '/repos/some-org/some-repo/pulls',
      });
      expect(client.doCall.receives.requests[1]).toEqual({
        method: 'GET',
        path: '/repos/some-org/some-repo/pulls?page=2',
      });
    });
  });
});
