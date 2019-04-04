import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

import Page from 'app/components/page'
import Loading from 'app/components/loading'

import pokemonsQuery from './pokemons.gql'

import styles from './style.css'

export default class NotFound extends Component {
  render() {
    return (
      <Query query={pokemonsQuery}>
        {({ loading, data }) => {
          if (loading || !data) {
            return (
              <Page className={styles.loadingContainer}>
                <Loading />
              </Page>
            )
          }

          return (
            <Page>
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
            </Page>
          )
        }}
      </Query>
    )
  }
}
