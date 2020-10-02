// @flow

import GitHubClient from './client';

describe('GitHubClient', () => {
  let client: GitHubClient;

  beforeEach(() => {
    client = new GitHubClient();
  });

  describe('authenticated', () => {
    describe('when a token has not been assigned', () => {
      it('returns false', () => {
        expect(client.authenticated()).toEqual(false);
      });
    });

    describe('when a token has been assigned', () => {
      beforeEach(() => {
        client.assignToken('some-token');
      });

      it('returns true', () => {
        expect(client.authenticated()).toEqual(true);
      });
    });
  });
});
