import React from 'react'
import { hydrate } from 'react-dom'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import App from 'app'

const history = createBrowserHistory()

hydrate((
  <Router history={history}>
    <App />
  </Router>
), document.getElementById('app'))
