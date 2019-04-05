import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, withRouter } from 'react-router-dom'

import Navbar from 'app/components/navbar'

import Home from './home'
import Detail from './detail'
import NotFound from './404'

import './style.css'

export default
@withRouter
class App extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Fragment>
        <Navbar shouldShowFilter={this.props.location.pathname === '/'} />
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
