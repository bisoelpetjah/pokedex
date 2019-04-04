import React from 'react'

import styles from './style.css'

const Page = ({ children, className }) => (
  <div className={`${styles.container} ${className}`}>{children}</div>
)

export default Page
