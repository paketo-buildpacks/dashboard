// @flow

import React, { type Node } from 'react';
import { Route, Redirect } from 'react-router-dom';

type Props = {
  children: Node,
  authenticated: boolean,
  path: string,
};

export default class PrivateRoute extends React.Component<Props> {
  render(): Node {
    return (
      <Route
        path={this.props.path}
        render={({ location }) =>
          this.props.authenticated ? (this.props.children) : (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          )
        }
      />
    );
  }
}
