import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import icon from './icon.svg'

import styles from './style.css'

export default class Navbar extends Component {
  render() {
    return (
      <nav className={styles.navbar}>
        <Link to="/" className={styles.link}>
          <img src={icon} className={styles.icon} />
          <span className={styles.text}>Pokédex</span>
        </Link>
      </nav>
    )
  }
}
