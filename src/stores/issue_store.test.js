// @flow

import IssueStore from './issue_store';
import GitHubClient from '../fakes/github_client';
import Issue from '../models/issue';

describe('IssueStore', () => {
  let store: IssueStore;
  let client: GitHubClient;

  beforeEach(() => {
    client = new GitHubClient();
    store = new IssueStore({ client: client });
  });

  describe('list', () => {
    beforeEach(() => {
      client.doCall.returns.responses = [
        {
          status: 200,
          data: [
            {
              id: 1234,
              number: 1,
              title: 'First Issue',
              html_url: 'first-url',
              created_at: '2011-04-22T13:33:48Z',
              comments: 1,
            },
            {
              id: 2345,
              number: 2,
              title: 'Second Issue',
              html_url: 'second-url',
              created_at: '2012-05-26T02:11:22Z',
              comments: 2,
              pull_request: {},
            },
          ],
          headers: {
            link: '</repos/some-org/some-repo/issues?page=2>; rel="next", </last-url>; rel="last"',
          },
        },
        {
          status: 200,
          data: [
            {
              id: 3456,
              number: 3,
              title: 'Third Issue',
              html_url: 'third-url',
              created_at: '2013-04-25T03:12:23Z',
              comments: 3,
            },
          ],
          headers: {
            link: null,
          },
        }
      ]
    });

    it('returns a list of issues', async () => {
      const issues = await store.list('some-org/some-repo');

      expect(issues).toEqual([
        new Issue({
          id: 1234,
          number: 1,
          title: 'First Issue',
          url: 'first-url',
          createdAt: '2011-04-22T13:33:48Z',
          commentCount: 1,
        }),
        new Issue({
          id: 3456,
          number: 3,
          title: 'Third Issue',
          url: 'third-url',
          createdAt: '2013-04-25T03:12:23Z',
          commentCount: 3,
        }),
      ]);

      expect(client.doCall.callCount).toEqual(2);
      expect(client.doCall.receives.requests).toHaveLength(2);
      expect(client.doCall.receives.requests[0]).toEqual({
        method: 'GET',
        path: '/repos/some-org/some-repo/issues',
      });
      expect(client.doCall.receives.requests[1]).toEqual({
        method: 'GET',
        path: '/repos/some-org/some-repo/issues?page=2',
      });
    });
  });
});
