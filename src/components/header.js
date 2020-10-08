// @flow

import React from 'react';
import type { Node } from 'react';

type Props = {};

class Header extends React.Component<Props> {
  render(): Node {
    let logoURL = '/logo512.png';
    if (process.env.PUBLIC_URL) {
      logoURL = `${process.env.PUBLIC_URL}/logo512.png`;
    }

    return (
      <header>
        <img src={logoURL} className="logo" alt="logo" />
        <h1>Paketo Buildpacks</h1>
      </header>
    )
  }
}

export default Header;
