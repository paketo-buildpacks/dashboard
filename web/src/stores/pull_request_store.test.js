// @flow

import PullRequestStore from './pull_request_store';
import PullRequest from '../models/pull_request';
import User from '../models/user';
import Label from '../models/label';

import GitHubClient from '../fakes/github_client';

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
          status: 200,
          data: [
            {
              id: 1111,
              number: 1,
              title: 'First PR',
              created_at: '2001-01-01T01:01:01Z',
              html_url: 'first-url',
              user: {
                avatar_url: 'first-avatar-url'
              },
              labels: [
                {
                  id: 1234,
                  name: 'first-label-name',
                  color: 'first-label-color',
                },
              ],
            },
            {
              id: 2222,
              number: 2,
              title: 'Second PR',
              created_at: '2002-02-02T02:02:02Z',
              html_url: 'second-url',
              user: {
                avatar_url: 'second-avatar-url'
              },
              labels: [],
            },
          ],
          headers: {
            link: '</repos/some-org/some-repo/pulls?page=2>; rel="next", </last-url>; rel="last"',
          },
        },
        {
          status: 200,
          data: [
            {
              id: 3333,
              number: 3,
              title: 'Third PR',
              created_at: '2003-03-03T03:03:03Z',
              html_url: 'third-url',
              user: {
                avatar_url: 'third-avatar-url'
              },
              labels: [
                {
                  id: 3456,
                  name: 'third-label-name',
                  color: 'third-label-color',
                },
              ],
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
        new PullRequest({
          id: 1111,
          number: 1,
          title: 'First PR',
          createdAt: '2001-01-01T01:01:01Z',
          url: 'first-url',
          user: new User({
            avatarURL: 'first-avatar-url',
          }),
          labels: [
            new Label({
              id: 1234,
              name: 'first-label-name',
              color: 'first-label-color',
            }),
          ],
        }),
        new PullRequest({
          id: 2222,
          number: 2,
          title: 'Second PR',
          createdAt: '2002-02-02T02:02:02Z',
          url: 'second-url',
          user: new User({
            avatarURL: 'second-avatar-url',
          }),
          labels: [],
        }),
        new PullRequest({
          id: 3333,
          number: 3,
          title: 'Third PR',
          createdAt: '2003-03-03T03:03:03Z',
          url: 'third-url',
          user: new User({
            avatarURL: 'third-avatar-url',
          }),
          labels: [
            new Label({
              id: 3456,
              name: 'third-label-name',
              color: 'third-label-color',
            }),
          ],
        }),
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
