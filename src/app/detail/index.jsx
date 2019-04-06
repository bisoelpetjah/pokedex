import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { Link } from 'react-router-dom'

import Page from 'app/components/page'
import Loading from 'app/components/loading'
import NotFound from 'app/404'
import meta from 'app/utils/meta'

import DetailSection from './section'

import pokemonQuery from './pokemon.gql'

import styles from './style.css'

@meta(({ loading, data }) => {
  if (loading) {
    return {
      title: 'Detail',
      description: 'Pokémon detail on Pokédex',
    }
  }

  if (!data || !data.pokemon) {
    return {
      title: 'Not found',
      description: 'Pokémon detail on Pokédex',
    }
  }

  return {
    title: data.pokemon.name,
    description: `${data.pokemon.name} detail on Pokédex`,
    image: data.pokemon.image,
  }
})
class DetailWithQuery extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object,
  }

  render() {
    const { loading, data } = this.props

    if (loading || !data) {
      return (
        <Page className={styles.loadingContainer}>
          <Loading />
        </Page>
      )
    }

    const { pokemon } = data

    if (!pokemon) {
      return (
        <NotFound />
      )
    }

    return (
      <Page>
        <div className={styles.name}>{pokemon.name}</div>
        <div className={styles.cardContainer}>
          <div className={styles.overviewContainer}>
            <div className={styles.imageContainer}>
              <img src={pokemon.image} className={styles.image} />
            </div>
            {pokemon.evolutions && pokemon.evolutions.length && (
              <DetailSection title="Evolutions" className={styles.evolutionSection}>
                <div className={styles.evolutionsContainer}>
                  {pokemon.evolutions.map(({ id, name, image }) => (
                    <Link
                      key={id}
                      to={`/${name.toLowerCase()}`}
                      className={styles.evolutionLink}>
                      <img src={image} className={styles.evolutionImage} />
                      <div className={styles.evolutionName}>{name}</div>
                    </Link>
                  ))}
                </div>
              </DetailSection>
            )}
          </div>
          <div className={styles.detailContainer}>
            <DetailSection title="Weight range" className={styles.detailSection}>
              {pokemon.weight.minimum} - {pokemon.weight.maximum}
            </DetailSection>
            <DetailSection title="Height range" className={styles.detailSection}>
              {pokemon.height.minimum} - {pokemon.height.maximum}
            </DetailSection>
            <DetailSection title="Classification" className={styles.detailSection}>
              {pokemon.classification}
            </DetailSection>
            <DetailSection title="Types" className={styles.detailSection}>
              {pokemon.types.join(', ')}
            </DetailSection>
            <DetailSection title="Fast attacks" className={styles.detailSection}>
              <ul className={styles.detailList}>
                {pokemon.attacks.fast.map(({ name, type }, index) => (
                  <li key={index}>{name} ({type})</li>
                ))}
              </ul>
            </DetailSection>
            <DetailSection title="Special attacks" className={styles.detailSection}>
              <ul className={styles.detailList}>
                {pokemon.attacks.special.map(({ name, type }, index) => (
                  <li key={index}>{name} ({type})</li>
                ))}
              </ul>
            </DetailSection>
            <DetailSection title="Resistances" className={styles.detailSection}>
              <ul className={styles.detailList}>
                {pokemon.resistant.map((resist, index) => (
                  <li key={index}>{resist}</li>
                ))}
              </ul>
            </DetailSection>
            <DetailSection title="Weaknesses" className={styles.detailSection}>
              <ul className={styles.detailList}>
                {pokemon.weaknesses.map((weak, index) => (
                  <li key={index}>{weak}</li>
                ))}
              </ul>
            </DetailSection>
          </div>
        </div>
      </Page>
    )
  }
}

const Detail = props => (
  <Query query={pokemonQuery} variables={{ name: props.match.params.id }}>
    {({ loading, data }) => (
      <DetailWithQuery
        {...props}
        loading={loading}
        data={data} />
    )}
  </Query>
)

export default Detail
