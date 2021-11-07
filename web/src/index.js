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
import ReleaseStore from './stores/release_store';
import Cache from './lib/cache';
import GetCookie from './lib/get_cookie';

async function run() {
  let token = GetCookie(document.cookie, "oauth_token");
  if (process.env.REACT_APP_GITHUB_TOKEN && process.env.REACT_APP_GITHUB_TOKEN !== '') {
    token = process.env.REACT_APP_GITHUB_TOKEN || '';
  }

  const gitHubClient = new GitHubClient({ token: token });
  const response = await gitHubClient.do({ method: 'GET', path: '/user' });
  if (response.status !== 200) {
    window.location.href = '/oauth/login';
    return;
  }


  const storage = window.localStorage;
  const timer = window;
  const cache = new Cache({ storage: storage });

  const repoStore = new RepoStore({ client: gitHubClient });
  // const topicStore = new TopicStore({ repoStore: repoStore });
  const issueStore = new IssueStore({ client: gitHubClient });
  const pullRequestStore = new PullRequestStore({ client: gitHubClient });
  const releaseStore = new ReleaseStore({ client: gitHubClient });

  ReactDOM.render(
    <BrowserRouter>
      <App
        repoStore={repoStore}
        issueStore={issueStore}
        pullRequestStore={pullRequestStore}
        releaseStore={releaseStore}
        timer={timer}
        cache={cache}
        storage={storage}
      />
    </BrowserRouter>,
    document.getElementById('root')
  );
};

run();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
