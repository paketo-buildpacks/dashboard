// @flow

import React from 'react';
import type { Node } from 'react';

type Props = {};

class Header extends React.Component<Props> {
  render(): Node {
    return (
      <header>
        <img src="/logo512.png" className="logo" alt="logo" />
        <h1>Paketo Buildpacks</h1>
      </header>
    )
  }
}

export default Header;
