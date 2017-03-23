import React, { Component } from 'react';
import { 
  StyleSheet,
  Text, 
  TouchableOpacity, 
  View,
  ScrollView,
  Image,
  TextInput } from 'react-native';
import Util from '../utils/utils';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MainButtons from '../components/PosMainView/MainButtons';
import SearchPanel from '../components/PosMainView/SearchPanel';
import MainMenus from '../components/PosMainView/MainMenus';
import ListOrder from '../components/PosMainView/ListOrder';

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
    const { title, navigator, index } = this.props;
    
    return(
      <Image
        style={styles.mainView}
        source={require('../assets/images/bg_all.png')}>
        <View style={styles.leftView}>
            <Image style={styles.logoImage} source={require('../assets/images/logo_top.png')} />
            <Text style={styles.startText}> thanks, I also try but that's working inside card so i use working great. </Text>
            <MainButtons 
              onPressButton={(component) => { navigator.push({
                title: ``,
                index: index + 1,
                display: false,
                component: component
              }) }} 
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

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .3,
    shadowRadius: 1.3,
  },
  leftView: {
    flex: 1,
    width: Util.size.width / 2,
    height: Util.size.height,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightView: {
    flex: 1,
    width: Util.size.width / 2,
    height: Util.size.height,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
  },
  startText: {
    flexWrap: 'wrap',
    width: 240,
    maxHeight: 200,
    marginTop: 40
  },
  mainButtons: {
      width: 460,
      height: 120,
      marginTop: 40
  },
  mainSearch: {
      width: 460,
      height: 100,
      marginTop: 0
  },
  mainMenus: {
      width: 520,
      height: 140,
      marginTop: 10,
      flexDirection: 'row', 
      justifyContent: 'center',
      alignItems: 'center',
  },
  ListOrder: {
      width: 800,
      height: 800,
      flexDirection: 'row', 
  },

});
