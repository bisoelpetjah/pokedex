import React, { Component } from 'react'

import Page from 'app/components/page'
import meta from 'app/utils/meta'

import pikachu from './sad-pikachu.png'

import styles from './style.css'

export default
@meta(() => ({
  title: 'Not found',
  description: 'Pokédex',
}))
class NotFound extends Component {
  render() {
    return (
      <Page className={styles.page}>
        <img src={pikachu} className={styles.image} />
        <span className={styles.text}>The page you&apos;re looking for doesn&apos;t exist</span>
      </Page>
    )
  }
}
