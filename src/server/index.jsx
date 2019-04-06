import express from 'express'
import proxy from 'http-proxy-middleware'
import path from 'path'
import favicon from 'serve-favicon'
import React from 'react'
import { ApolloProvider, getDataFromTree } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { StaticRouter } from 'react-router'
import { renderToString } from 'react-dom/server'

import manifest from '../../manifest.json'

import appConfig from 'config/app'
import apiConfig from 'config/api'

import App from 'app'
import { MetaProvider } from 'app/utils/meta'

const app = express()

if (appConfig.environment === 'development') {
  app.use(express.static(path.resolve(__dirname, '..', '..', 'public')))

  app.use('/dist', proxy({
    target: `http://localhost:${appConfig.port + 1}`,
    pathRewrite:{ '/dist/': '/' },
    changeOrigin: true,
  }))
} else {
  app.use(express.static(path.resolve(__dirname, '..', '..', 'public'), {
    setHeaders: (res, path) => {
      if (path.indexOf('.js') !== -1) res.header('Content-Encoding', 'gzip')
    },
  }))
}

app.use(favicon(path.resolve(__dirname, 'favicon.ico')))

app.use((req, res, next) => {
  const apolloClient = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({ uri: apiConfig.endpoint }),
    cache: new InMemoryCache(),
  })

  const routerContext = {}
  const metaContext = {}

  const config = { api: apiConfig }

  const component = (
    <ApolloProvider client={apolloClient}>
      <StaticRouter location={req.url} context={routerContext}>
        <MetaProvider context={metaContext}>
          <App />
        </MetaProvider>
      </StaticRouter>
    </ApolloProvider>
  )

  if (routerContext.url) return res.redirect(routerContext.url)

  const renderComponent = () => {
    const initialState = {
      config,
      apollo: apolloClient.cache.extract(),
    }

    const componentString = renderToString(component)

    const url = (routerContext.url || req.url).split('?')[0]
    const meta = metaContext.pageMeta[url]

    res.data = {
      metadata: (meta && meta.title) ? {
        ...meta,
        title: `${meta.title} | Pokédex`,
      } : {
        title: 'Pokédex',
        description: 'Pokédex',
      },
      initialState: JSON.stringify(initialState),
      content: componentString,
    }

    return next()
  }

  getDataFromTree(component)
    .then(renderComponent)
    .catch(renderComponent)
})

app.use((req, res, next) => {
  res.data.assets = manifest
  return next()
})

app.set('view engine', 'ejs')

app.set('views', __dirname)

app.use((req, res) => {
  return res.render('index', res.data)
})

export default app
