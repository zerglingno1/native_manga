import React, { Component } from 'react'
import PosMainView from '../pages/PosMainView'
import OrderPage from '../pages/OrderPage'
import WebViewPage from '../pages/WebViewPage'
import Reminder from '../pages/Reminder'

import {
  BackAndroid,
  NavigationExperimental
} from 'react-native'

const {
  CardStack: NavigationCardStack
} = NavigationExperimental

class Route extends Component {
  constructor (props) {
    super(props)
    this._renderScene = this._renderScene.bind(this)
    this._handleBackAction = this._handleBackAction.bind(this)
  }
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)
  }
  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction)
  }
  _renderScene (props) {
    const { route } = props.scene
    switch (route.key) {
      case 'main': 
        return <PosMainView _handleNavigate={this._handleNavigate.bind(this)} _goBack={this._handleBackAction.bind(this)} />
      break
      case 'order': 
        return <OrderPage _handleNavigate={this._handleNavigate.bind(this)} _goBack={this._handleBackAction.bind(this)} />
      break
      case 'webview': 
        return <WebViewPage _handleNavigate={this._handleNavigate.bind(this)} _goBack={this._handleBackAction.bind(this)} />
      break
      case 'reminder': 
        return <Reminder _handleNavigate={this._handleNavigate.bind(this)} _goBack={this._handleBackAction.bind(this)} />
      break
    }
  }
  _handleBackAction () {
    if (this.props.navigation.index === 0) {
      return false
    }
    this.props.popRoute()
    return true
  }
  _handleNavigate (action) {
    switch (action && action.type) {
      case 'push':
        this.props.pushRoute(action.route)
        return true
      case 'back':
      case 'pop':
        return this._handleBackAction()
      default:
        return false
    }
  }
  render () {
    return (
      <NavigationCardStack
        direction='vertical'
        navigationState={this.props.navigation}
        onNavigate={this._handleNavigate.bind(this)}
        renderScene={this._renderScene} />
      )
   }
}

export default Route