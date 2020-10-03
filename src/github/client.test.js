// @flow

import GitHubClient from './client';
import LocalStorage from '../fakes/local_storage';

describe('GitHubClient', () => {
  let client: GitHubClient;
  let storage: LocalStorage;

  beforeEach(() => {
    storage = new LocalStorage();
    client = new GitHubClient({ storage: storage });
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

  describe('assignToken', () => {
    it('stores the token in storage', () => {
      expect(storage.getItem('token')).toBeNull();

      client.assignToken('some-token');

      expect(storage.getItem('token')).toEqual('some-token');
    });
  });
});
