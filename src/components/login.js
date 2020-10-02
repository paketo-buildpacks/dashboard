// @flow

import React from 'react';
import type { Node } from 'react';

type Props = {
  assignToken: string => void;
};

type State = {
  token: string,
};

class Login extends React.Component<Props, State> {
  handleChange: SyntheticEvent<HTMLInputElement> => void;
  handleSubmit: SyntheticEvent<HTMLFormElement> => void;

  constructor(props: Props) {
    super(props);

    this.state = { token: '' };

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
  }

  render(): Node {
    return (
      <form id="login" onSubmit={this.handleSubmit}>
        <label htmlFor="token">Token</label>
        <input type="text" id="token" value={this.state.token} onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Login;
