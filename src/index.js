// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import App from './components';

import GitHubClient from './lib/github_client';
import RepoStore from './stores/repo_store';
import IssueStore from './stores/issue_store';
import PullRequestStore from './stores/pull_request_store';
import Cache from './lib/cache';

const storage = window.localStorage;
const timer = window;
const cache = new Cache({ storage: storage });

const gitHubClient = new GitHubClient({ storage: storage });
const repoStore = new RepoStore({ client: gitHubClient });
const issueStore = new IssueStore({ client: gitHubClient });
const pullRequestStore = new PullRequestStore({ client: gitHubClient });

ReactDOM.render(
  <BrowserRouter>
    <App
      repoStore={repoStore}
      issueStore={issueStore}
      pullRequestStore={pullRequestStore}
      timer={timer}
      cache={cache}
      storage={storage}
    />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
