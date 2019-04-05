import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'

import icon from './filter.svg'
import iconActive from './filter-active.svg'

import styles from './style.css'

export default class NavbarFilter extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    activeItem: PropTypes.string,
    onFilterChange: PropTypes.func,
    className: PropTypes.string,
  }

  constructor(props) {
    super(props)

    this._filter = createRef()

    this.state = {
      showDropdown: false,
    }
  }

  handleFilterClick = () => {
    this.setState(({ showDropdown }) => ({ showDropdown: !showDropdown }), () => {
      if (this.state.showDropdown) {
        document.addEventListener('click', this.handleOutsideClick)
      } else {
        document.removeEventListener('click', this.handleOutsideClick)
      }
    })
  }

  handleFilterChange = item => {
    const { onFilterChange } = this.props

    onFilterChange && onFilterChange(item)
    this.handleFilterClick()
  }

  handleOutsideClick = e => {
    if (!this._filter.current.contains(e.target)) this.handleFilterClick()
  }

  render() {
    const { items, activeItem, className } = this.props

    return (
      <div ref={this._filter}>
        <button onClick={this.handleFilterClick} className={`${styles.button} ${className}`}>
          <img src={activeItem ? iconActive : icon} className={styles.icon} />
        </button>
        {this.state.showDropdown && (
          <div className={styles.dropdown}>
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => { this.handleFilterChange(item) }}
                className={`${styles.item} ${activeItem === item && styles.active}`}>
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }
}
