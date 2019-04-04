import React, { createContext } from 'react'

const { Provider, Consumer } = createContext('config')

export const ConfigProvider = ({ children, config }) => (
  <Provider value={config}>
    {children}
  </Provider>
)

const Config = ({ children }) => (
  <Consumer>
    {value => children(value)}
  </Consumer>
)

export default Config
