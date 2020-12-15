// @flow

import Repo from './repo';

describe('Repo', () => {
  describe('isEqualTo', () => {
    describe('when the repos are equal', () => {
      it('returns true', () => {
        const first = new Repo({
          name: 'some-name',
          url: 'some-url',
          openIssuesCount: 1,
        });
        const second = new Repo({
          name: 'some-name',
          url: 'some-url',
          openIssuesCount: 1,
        });
        expect(first.isEqualTo(second)).toEqual(true);
      });
    });

    describe('when the names differ', () => {
      it('returns true', () => {
        const first = new Repo({
          name: 'some-name',
          url: 'some-url',
          openIssuesCount: 1,
        });
        const second = new Repo({
          name: 'other-name',
          url: 'some-url',
          openIssuesCount: 1,
        });
        expect(first.isEqualTo(second)).toEqual(false);
      });
    });

    describe('when the urls differ', () => {
      it('returns true', () => {
        const first = new Repo({
          name: 'some-name',
          url: 'some-url',
          openIssuesCount: 1,
        });
        const second = new Repo({
          name: 'some-name',
          url: 'other-url',
          openIssuesCount: 1,
        });
        expect(first.isEqualTo(second)).toEqual(false);
      });
    });

    describe('when the open issues counts differ', () => {
      it('returns true', () => {
        const first = new Repo({
          name: 'some-name',
          url: 'some-url',
          openIssuesCount: 1,
        });
        const second = new Repo({
          name: 'some-name',
          url: 'some-url',
          openIssuesCount: 2,
        });
        expect(first.isEqualTo(second)).toEqual(false);
      });
    });
  });
});
