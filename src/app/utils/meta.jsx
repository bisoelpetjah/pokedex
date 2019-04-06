import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import hoistStatics from 'hoist-non-react-statics'

const { Provider, Consumer } = createContext()

export class MetaProvider extends Component {
  static propTypes = {
    children: PropTypes.node,
    context: PropTypes.object,
    onPageMetaChange: PropTypes.func,
  }

  constructor(props) {
    super(props)

    if (props.context) props.context.pageMeta = {}

    this.state = {
      pageMeta: {},
    }
  }

  handleSetPageMeta = (url, meta) => {
    const { context, onPageMetaChange } = this.props

    if (context) {
      context.pageMeta = {
        ...context.pageMeta,
        [url]: meta,
      }
    } else {
      this.setState(({ pageMeta }) => {
        if (!meta || JSON.stringify(pageMeta[url]) === JSON.stringify(meta)) return null

        return {
          pageMeta: {
            ...pageMeta,
            [url]: meta,
          },
        }
      }, () => {
        if (onPageMetaChange) onPageMetaChange(this.state.pageMeta[url])
      })
    }
  }

  render() {
    return (
      <Provider value={{ setPageMeta: this.handleSetPageMeta }}>
        {this.props.children}
      </Provider>
    )
  }
}

export default getPageMeta => {
  return WrappedComponent => {
    @withRouter
    class MetaWithContext extends Component {
      static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        setPageMeta: PropTypes.func.isRequired,
      }

      constructor(props) {
        super(props)

        this.handleSetPageMeta(props)
      }

      componentDidMount() {
        this.handleSetPageMeta(this.props)
      }

      componentDidUpdate() {
        this.handleSetPageMeta(this.props)
      }

      handleSetPageMeta = props => {
        if (!getPageMeta) return

        const { match: { url }, location: { pathname }, setPageMeta } = props

        if (url === pathname) setPageMeta(url, getPageMeta(props))
      }

      render() {
        return (
          <WrappedComponent {...this.props} />
        )
      }
    }

    class Meta extends Component {
      render() {
        return(
          <Consumer>
            {({ setPageMeta }) => (
              <MetaWithContext {...this.props} setPageMeta={setPageMeta} />
            )}
          </Consumer>
        )
      }
    }

    return hoistStatics(Meta, WrappedComponent)
  }
}
