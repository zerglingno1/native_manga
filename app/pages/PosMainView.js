import React, { Component } from 'react';
import { 
  StyleSheet,
  Text, 
  TouchableOpacity, 
  View,
  ScrollView,
  Image,
  TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainButtons from '../components/PosMainView/MainButtons';
import SearchPanel from '../components/PosMainView/SearchPanel';
import MainMenus from '../components/PosMainView/MainMenus';
import ListOrder from '../components/PosMainView/ListOrder';

import styleSheet from '../styles/PosMainView';

export default class PosMainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [{
          title: 'MENU A',
          component: 'webview'
      }, {
          title: 'MENU B',
          component: 'webview'
      }, {
          title: 'MENU C',
          component: 'webview'
      }, {
          title: 'MENU D',
          component: 'webview'
      }, {
          title: 'MENU E',
          component: 'webview'
      }, {
          title: 'MENU F',
          component: 'webview'
      }, {
          title: 'MENU G',
          component: 'webview'
      }, {
          title: 'MENU H',
          component: 'webview'
      }],
      search: ''
    }
  }

  _goToPage(index) {
    const { menus } = this.state;
    const { navigator } = this.props;

    navigator.push({
      title: menus[index].title,
      index: index + 1,
      display: !menus[index].hideNav,
      component: menus[index].component,
      data: (menus[index].data) ? menus[index].data : {}
    })
  }

  render() {
    const { menus, search } = this.state;
    const { title, navigator, index, _handleNavigate } = this.props;
    
    return(
      <Image
        style={styles.mainView}
        source={require('../../public/images/bg_all.png')}>
        <View style={styles.leftView}>
            <Image style={styles.logoImage} source={require('../../public/images/logo_top.png')} />
            <Text style={styles.startText}> thanks, I also try but that's working inside card so i use working great. </Text>
            <MainButtons 
              onPressButton={(route) => { _handleNavigate(route) }} 
              cStyles={styles.mainButtons}  />
            <SearchPanel 
              onPressButton={() => {}} 
              cStyles={styles.mainSearch} />
            <MainMenus 
              onPressButton={() => {}} 
              cStyles={styles.mainMenus} 
              menus={menus} />
        </View>
        <View style={styles.rightView}>
          <ListOrder 
              onPressButton={() => {}} 
              cStyles={styles.ListOrder} 
              data={[]}/>
        </View>
      </Image>
    );
  }
}

const styles = styleSheet();
