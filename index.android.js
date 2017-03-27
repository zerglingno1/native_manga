/**
 * Todo native
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { 
  AppRegistry,
  DeviceEventEmitter,
  Image,
  Navigator,
  StyleSheet,
  Text, 
  TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PosMainView from './app/pages/PosMainView';

class NavigationBar extends Navigator.NavigationBar {
  render() {
    let { navState } = this.props;
    let routes = navState.routeStack;

    if (routes.length) {
      let route = routes[routes.length - 1];

      if (route.display === false) {
        return null;
      }
    }

    return super.render();
  }
}

class native_manga extends Component {
  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.FadeAndroid;
  }

  routeMapper = {
    LeftButton: (route, navigator, index, navState) =>
      {
        if(route.index > 0) {
          return <TouchableOpacity
            underlayColor='transparent'
            onPress={() => {if (index > 0) {navigator.pop()}}}>
            <Text style={styles.navBackBtn}><Icon size={18} name='ios-arrow-back'></Icon> BACK</Text>
          </TouchableOpacity>;
        } else {
          return null;
        }
      },
    RightButton: (route, navigator, index, navState) =>
      { return null; },
    Title: (route, navigator, index, navState) =>
      { return (<Text style={styles.navTitle}>{route.title}</Text>); },
  };
  
  render(){
    return (
      <Navigator
        initialRoute={{ 
          title: 'EC ORANGE',
          index: 0,
          display: false,
          component: PosMainView,
        }}
        configureScene={this.configureScene}
        renderScene={(route, navigator) => {
          return <route.component navigator={navigator} title={route.title} index={route.index} data={route.data} />
        }}
        navigationBar={
          <NavigationBar
            routeMapper={this.routeMapper}
            style={styles.navBar} />
        } />
    );
  }
}

const styles = StyleSheet.create({
  navBar: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'

  },
  navTitle: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: '500',
  },
  navBackBtn: {
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 18,
    color: '#555',
  },
});

AppRegistry.registerComponent('native_manga', () => native_manga);