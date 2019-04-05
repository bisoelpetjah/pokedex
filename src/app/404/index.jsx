import React from 'react'

import Page from 'app/components/page'

import pikachu from './sad-pikachu.png'

import styles from './style.css'

const Home = () => (
  <Page className={styles.page}>
    <img src={pikachu} className={styles.image} />
    <span className={styles.text}>The page you&apos;re looking for doesn&apos;t exist</span>
  </Page>
)

export default Home
