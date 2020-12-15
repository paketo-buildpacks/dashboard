// @flow

import React, { type Node } from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {|
  children: Node,
  authenticated: boolean,
  path: string,
|};

export default class PrivateRoute extends React.Component<Props> {
  render(): Node {
    let root = "";
    if (process.env.PUBLIC_URL) {
      root = process.env.PUBLIC_URL;
    }

    return (
      <Route
        path={this.props.path}
        render={({ location }) =>
          this.props.authenticated ? (this.props.children) : (
            <Redirect to={ { pathname: `${root}/login`, state: { from: location } } } />
          )
        }
      />
    );
  }
}
