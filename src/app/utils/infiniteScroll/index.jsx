import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import debounce from 'debounce'

export default class InfiniteScroll extends Component {
  static propTypes = {
    children: PropTypes.node,
    onScrollEnd: PropTypes.func,
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = debounce(() => {
    const documentHeight = document.body.offsetHeight
    const scrollPosition = window.scrollY
    const viewportHeight = window.innerHeight

    const { onScrollEnd } = this.props

    if (documentHeight - scrollPosition <= viewportHeight + 500) onScrollEnd && onScrollEnd()
  }, 100)

  render() {
    return (
      <Fragment>
        {this.props.children}
      </Fragment>
    )
  }
}
