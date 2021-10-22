// @flow

import GetCookie from './get_cookie';

describe('GetCookie', () => {
  it('returns the named cookie', () => {
    const cookie = GetCookie("other-key=other-value; some-key=some-value", "some-key");
    expect(cookie).toEqual("some-value")
  });
});
