// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';

import App from './components/app';
import RepoStore from './stores/repo_store';
import GitHubClient from './github/client';

const gitHubClient = new GitHubClient();
const repoStore = new RepoStore({ client: gitHubClient });

ReactDOM.render(
  <React.StrictMode>
    <App
      repoStore={repoStore}
      gitHubClient={gitHubClient}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
