// @flow

import React from 'react';
import type { Node } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';

type Props = {||};

class Header extends React.Component<Props> {
  render(): Node {
    let root = '';
    if (process.env.PUBLIC_URL) {
      root = process.env.PUBLIC_URL;
    }

    return (
      <header>
        <h1>
          <Link to={root}>
            <img src={`${root}/logo512.png`} className="logo" alt="logo" />
            Paketo Buildpacks
          </Link>
        </h1>
        <div className="navigation">
          <h3>
            <Link to={`${root}/issues`}>Issues</Link>
          </h3>
        </div>
      </header>
    )
  }
}

export default Header;
