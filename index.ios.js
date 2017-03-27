/**
 * Todo native
 * https://github.com/facebook/react-native
 * @flow
 */


import React from 'react'
import { AppRegistry } from 'react-native'

import configureStore from './app/store/configureStore'
const store = configureStore()

import NavigationRootContainer from './app/containers/navigatorContainer'
import { Provider } from 'react-redux'

const App = () => (
  <Provider store={store}>
    <NavigationRootContainer />
  </Provider>
)

AppRegistry.registerComponent('native_manga', () => App);