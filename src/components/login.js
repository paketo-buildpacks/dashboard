// @flow

import React from 'react';
import type { Node } from 'react';
import '../styles/login.css';

type Props = {|
  assignToken: string => void,
  history: {
    replace: { pathname: string } => void,
  },
  location: { state: { from: { pathname: string } } },
|};

type State = {|
  token: string,
  from: { pathname: string },
|};

class Login extends React.Component<Props, State> {
  handleChange: SyntheticEvent<HTMLInputElement> => void;
  handleSubmit: SyntheticEvent<HTMLFormElement> => void;

  constructor(props: Props) {
    super(props);

    let root = '/';
    if (process.env.PUBLIC_URL) {
      root = process.env.PUBLIC_URL;
    }

    const { from } = this.props.location.state || { from: { pathname: root } };
    this.state = { token: '', from: from };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: SyntheticEvent<HTMLInputElement>): void {
    const input = (event.currentTarget: HTMLInputElement);
    this.setState({ token: input.value });
  }

  handleSubmit(event: SyntheticEvent<HTMLFormElement>): void {
    event.preventDefault();

    this.props.assignToken(this.state.token);
    this.props.history.replace(this.state.from);
  }

  render(): Node {
    return (
      <form className="login" onSubmit={this.handleSubmit}>
        <label htmlFor="token">GitHub Personal Access Token</label>
        <input type="text" id="token" value={this.state.token} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Login;
