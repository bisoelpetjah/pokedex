import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import Page from 'app/components/page'
import Loading from 'app/components/loading'

import pokemonQuery from './pokemon.gql'

import styles from './style.css'

export default class Detail extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  render() {
    const { match: { params: { id } } } = this.props

    return (
      <Query query={pokemonQuery} variables={{ name: id }}>
        {({ loading, data }) => {
          if (loading || !data) {
            return (
              <Page className={styles.loadingContainer}>
                <Loading />
              </Page>
            )
          }

          const { pokemon } = data

          if (!pokemon) return

          return (
            <Page>
              <div className={styles.pokemonName}>{pokemon.name}</div>
              <div className={styles.pokemonCardContainer}>
                <div className={styles.pokemonImageContainer}>
                  <img src={pokemon.image} className={styles.pokemonImage} />
                </div>
                <div className={styles.pokemonDetailContainer}>
                  Detail
                </div>
              </div>
            </Page>
          )
        }}
      </Query>
    )
  }
}
