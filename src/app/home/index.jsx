import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'
import { parse } from 'query-string'

import Page from 'app/components/page'
import Loading from 'app/components/loading'
import InfiniteScroll from 'app/utils/infiniteScroll'

import pokemonsQuery from './pokemons.gql'

import styles from './style.css'

class HomeWithQuery extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object,
    onFetchNewPage: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { loading, data, onFetchNewPage } = this.props
    if (!loading && (!data || !data.length)) onFetchNewPage()
  }

  componentDidUpdate() {
    const { loading, data, onFetchNewPage } = this.props

    if (!loading && (!data || !data.length)) onFetchNewPage()
  }

  handleScrollEnd = () => {
    const { loading, onFetchNewPage } = this.props
    if (!loading) onFetchNewPage()
  }

  render() {
    const { location: { search }, loading, data } = this.props

    if ((!data || !data.pokemons || !data.pokemons.length) && loading) {
      return (
        <Page className={styles.loadingContainer}>
          <Loading />
        </Page>
      )
    }

    let pokemons = data.pokemons

    const { filter } = parse(search)
    if (filter) {
      pokemons = pokemons.filter(({ types }) => (types.includes(filter)))
    }

    return (
      <Page className={styles.page}>
        <InfiniteScroll onScrollEnd={this.handleScrollEnd}>
          <div className={styles.pokemonListContainer}>
            {pokemons.map(({ id, name, image }) => (
              <Link
                key={id}
                to={`/${name.toLowerCase()}`}
                className={styles.pokemonContainer}>
                <img src={image} className={styles.pokemonImage} />
                <div className={styles.pokemonName}>{name}</div>
              </Link>
            ))}
          </div>
          {loading && (
            <Loading className={styles.paginationLoading} />
          )}
        </InfiniteScroll>
      </Page>
    )
  }
}

const Home = props => {
  const [currentPage, setCurrentPage] = useState(15)

  const handleFetchNewPage = () => { if (currentPage < 150) setCurrentPage(currentPage + 15) }

  return (
    <Query query={pokemonsQuery} variables={{ first: currentPage }}>
      {({ loading, data }) => (
        <HomeWithQuery
          {...props}
          loading={loading}
          data={data}
          onFetchNewPage={handleFetchNewPage} />
      )}
    </Query>
  )
}

export default Home
