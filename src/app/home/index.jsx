import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

import Page from 'app/components/page'
import Loading from 'app/components/loading'
import InfiniteScroll from 'app/utils/infiniteScroll'

import pokemonsQuery from './pokemons.gql'

import styles from './style.css'

class HomeWithQuery extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object,
    onFetchNewPage: PropTypes.func.isRequired,
  }

  handleScrollEnd = () => {
    const { loading, onFetchNewPage } = this.props
    if (!loading) onFetchNewPage()
  }

  render() {
    const { loading, data } = this.props

    if ((!data || !data.pokemons || !data.pokemons.length) && loading) {
      return (
        <Page className={styles.loadingContainer}>
          <Loading />
        </Page>
      )
    }

    return (
      <Page className={styles.page}>
        <InfiniteScroll onScrollEnd={this.handleScrollEnd}>
          <div className={styles.pokemonListContainer}>
            {data.pokemons.map(({ id, name, image }) => (
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

const Home = () => {
  const [currentPage, setCurrentPage] = useState(15)

  const handleFetchNewPage = () => { setCurrentPage(currentPage + 9) }

  return (
    <Query query={pokemonsQuery} variables={{ first: currentPage }}>
      {({ loading, data }) => (
        <HomeWithQuery
          loading={loading}
          data={data}
          onFetchNewPage={handleFetchNewPage} />
      )}
    </Query>
  )
}

export default Home
