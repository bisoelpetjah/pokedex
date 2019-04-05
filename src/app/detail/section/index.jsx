import React from 'react'

import styles from './style.css'

const DetailSection = ({ children, title, className }) => (
  <div className={`${styles.container} ${className}`}>
    <div className={styles.title}>{title}</div>
    <div className={styles.content}>{children}</div>
  </div>
)

export default DetailSection
