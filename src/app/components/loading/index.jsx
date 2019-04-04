import React from 'react'

import icon from './icon.svg'

import styles from './style.css'

const Loading = ({ className }) => (
  <img src={icon} className={`${styles.icon} ${className}`} />
)

export default Loading
