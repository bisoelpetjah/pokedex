import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { parse, stringify } from 'query-string'

import NavbarFilter from './filter'

import icon from './icon.svg'

import styles from './style.css'

const pokemonTypes = [
  'Normal',
  'Fire',
  'Fighting',
  'Water',
  'Flying',
  'Grass',
  'Poison',
  'Electric',
  'Ground',
  'Psychic',
  'Rock',
  'Ice',
  'Bug',
  'Dragon',
  'Ghost',
  'Dark',
  'Steel',
  'Fairy',
]

export default
@withRouter
class Navbar extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    shouldShowFilter: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    shouldShowFilter: false,
  }

  handleFilterChange = activeItem => {
    const { location, history } = this.props
    history.push({
      ...location,
      search: stringify({ filter: activeItem }),
    })
  }

  render() {
    const { location: { search } } = this.props

    const { filter } = parse(search)

    return (
      <nav className={styles.navbar}>
        <Link to="/" className={styles.link}>
          <img src={icon} className={styles.icon} />
          <span className={styles.text}>Pokédex</span>
        </Link>
        {this.props.shouldShowFilter && (
          <div>
            <NavbarFilter
              items={pokemonTypes}
              activeItem={filter}
              onFilterChange={this.handleFilterChange} />
          </div>
        )}
      </nav>
    )
  }
}
