// @flow

export default function GetCookie(cookies: string, name: string): string {
  const cookie = cookies.split('; ').find(row => row.startsWith(`${name}=`))
  if (cookie) {
    return cookie.split('=')[1];
  }

  return '';
}
