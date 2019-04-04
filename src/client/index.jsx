import React from 'react'
import { hydrate } from 'react-dom'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import App from 'app'
import { ConfigProvider } from 'app/utils/config'

const initialState = window.__INITIAL_STATE__

const { config } = initialState

const history = createBrowserHistory()

hydrate((
  <Router history={history}>
    <ConfigProvider config={config}>
      <App />
    </ConfigProvider>
  </Router>
), document.getElementById('app'))
