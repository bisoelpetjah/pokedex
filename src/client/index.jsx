import React from 'react'
import { hydrate } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import App from 'app'

const initialState = window.__INITIAL_STATE__

const { config, apollo } = initialState

const apolloClient = new ApolloClient({
  link: createHttpLink({ uri: config.api.endpoint }),
  cache: new InMemoryCache().restore(apollo),
})

const history = createBrowserHistory()

hydrate((
  <ApolloProvider client={apolloClient}>
    <Router history={history}>
      <App />
    </Router>
  </ApolloProvider>
), document.getElementById('app'))
