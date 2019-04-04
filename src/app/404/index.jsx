import React, { Component } from 'react'

import Page from 'app/components/page'

import pikachu from './sad-pikachu.png'

import styles from './style.css'

export default class Home extends Component {
  render() {
    return (
      <Page className={styles.page}>
        <img src={pikachu} className={styles.image} />
        <span className={styles.text}>The page you&apos;re looking for doesn&apos;t exist</span>
      </Page>
    )
  }
}
