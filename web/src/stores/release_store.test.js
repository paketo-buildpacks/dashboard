// @flow

import ReleaseStore from './release_store';

import Release, { NullRelease } from '../models/release';
import GitHubClient from '../fakes/github_client';

describe('ReleaseStore', () => {
  let store: ReleaseStore;
  let client: GitHubClient;

  beforeEach(() => {
    client = new GitHubClient();
    client.doCall.returns.responses = [
      {
        status: 200,
        data: {
          tag_name: 'some-release-tag',
        },
        headers: {
          link: null,
        },
      },
      {
        status: 200,
        data: {
          behind_by: 2,
        },
        headers: {
          link: null,
        },
      },
    ];

    store = new ReleaseStore({ client: client });
  });

  describe('latest', () => {
    it('returns the latest release for a repo', async () => {
      const release = await store.latest('some-org/some-repo');

      expect(release).toEqual(new Release({
        tag: 'some-release-tag',
        commitsBehind: 2,
      }));
    });

    describe('when the response status is not success', () => {
      beforeEach(() => {
        client.doCall.returns.responses = [
          {
            status: 404,
            data: { },
            headers: {
              link: null,
            },
          },
        ];
      });

      it('returns a null release', async () => {
        const release = await store.latest('some-org/some-repo');

        expect(release).toEqual(NullRelease);
      });
    });
  });
});
