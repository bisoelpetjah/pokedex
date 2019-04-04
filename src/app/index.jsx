import React, { Component, Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'

import Navbar from 'app/components/navbar'

import Home from './home'
import Detail from './detail'
import NotFound from './404'

import './style.css'

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <Navbar />
        <Switch>
          <Route
            path="/"
            exact
            component={Home} />
          <Route path="/:id" component={Detail} />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    )
  }
}
