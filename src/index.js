// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import App from './components/app';

import GitHubClient from './github/client';
import RepoStore from './stores/repo_store';
import IssueStore from './stores/issue_store';
import PullRequestStore from './stores/pull_request_store';

const storage = window.localStorage;
const gitHubClient = new GitHubClient({ storage: storage });
const repoStore = new RepoStore({ client: gitHubClient });
const issueStore = new IssueStore({ client: gitHubClient });
const pullRequestStore = new PullRequestStore({ client: gitHubClient });
const timer = window;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App
        gitHubClient={gitHubClient}
        repoStore={repoStore}
        issueStore={issueStore}
        pullRequestStore={pullRequestStore}
        timer={timer}
      />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
