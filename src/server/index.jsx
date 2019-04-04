import express from 'express'
import proxy from 'http-proxy-middleware'
import path from 'path'
import favicon from 'serve-favicon'
import React from 'react'
import { StaticRouter } from 'react-router'
import { renderToString } from 'react-dom/server'

import manifest from '../../manifest.json'

import appConfig from 'config/app'

import App from 'app'

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
  const routerContext = {}

  const component = (
    <StaticRouter location={req.url} context={routerContext}>
      <App />
    </StaticRouter>
  )

  if (routerContext.url) return res.redirect(routerContext.url)

  const componentString = renderToString(component)

  res.data = {
    metadata: {
      title: 'Pokedex',
      description: 'Pokedex',
    },
    content: componentString,
  }

  return next()
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
