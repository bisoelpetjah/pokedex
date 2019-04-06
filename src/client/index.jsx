import React from 'react'
import { hydrate } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import App from 'app'
import { MetaProvider } from 'app/utils/meta'

const initialState = window.__INITIAL_STATE__

const { config, apollo } = initialState

const apolloClient = new ApolloClient({
  link: createHttpLink({ uri: config.api.endpoint }),
  cache: new InMemoryCache().restore(apollo),
})

const history = createBrowserHistory()

const historyScrollStack = [{
  url: `${history.location.pathname}${history.location.search}`,
  scrollPosition: 0,
}]

history.listen(({ pathname, search }) => {
  const fullUrl = `${pathname}${search}`

  const isForward = (historyScrollStack.length < 2) || (historyScrollStack[historyScrollStack.length - 2].url !== fullUrl)
  if (isForward) {
    historyScrollStack.push({
      url: fullUrl,
      scrollPosition: window.scrollY,
    })
    window.requestAnimationFrame(() => { window.scrollTo(0, 0) })
  } else {
    window.requestAnimationFrame(() => { window.scrollTo(0, historyScrollStack.pop().scrollPosition) })
  }
})

const setPageMeta = meta => {
  document.title = (meta && meta.title) ? `${meta.title} | Pokédex` : 'Pokédex'
}

hydrate((
  <ApolloProvider client={apolloClient}>
    <Router history={history}>
      <MetaProvider onPageMetaChange={setPageMeta}>
        <App />
      </MetaProvider>
    </Router>
  </ApolloProvider>
), document.getElementById('app'))
