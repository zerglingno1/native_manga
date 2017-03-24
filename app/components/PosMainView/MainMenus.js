'use strict';

import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  ScrollView, 
  ListView,
  TouchableOpacity, Image } from 'react-native';
import Util from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';

export default class MainMenus extends Component{

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource
    };
  }

  render() {
    const { cStyles, onPressButton, menus } = this.props;
    const { dataSource } = this.state;
    let source = dataSource.cloneWithRows(menus);
    
    return(
      <View style={cStyles}>
        <Image
        style={styles.navigatorLeft}
        source={require('../../assets/button/icon_arrow_left.png')}/>
        <ListView
          style={styles.watchControlContainer}
          ref='list'
          horizontal = {true}
          showsHorizontalScrollIndicator= {true}
          enableEmptySections = {true} 
          dataSource={source}
          renderRow={(menu) => 
          <TouchableOpacity style={styles.btn}>
            <Image style={styles.imgBtn} source={require('../../assets/button/btn_tenkey_g.png')}>
              <Text style={styles.titleBtn}>{menu.title}</Text>
            </Image>
          </TouchableOpacity>
          }/>
        <Image
          style={styles.navigatorRight}
          source={require('../../assets/button/icon_arrow_right.png')}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  watchControlContainer: {
    backgroundColor: 'transparent',
  },
  btn: {
    width: Util.percentToPixel(6.25, Util.size.width) - 6 * 3 + 5,
    height: Util.percentToPixel(6.25, Util.size.width) - 6 * 3 + 5,
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 3,
    marginTop: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  navigatorRight: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: 10,
    height: 10,
    marginLeft: 11,
  },
  navigatorLeft: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    width: 10,
    height: 10,
    marginRight: 0,
  },
  imgBtn: {
    width: Util.percentToPixel(6.25, Util.size.width) - 6 * 3 + 5,
    height: Util.percentToPixel(6.25, Util.size.width) - 6 * 3 + 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  titleBtn: {
    fontSize: (Util.size.width > 1242) ? 15 : 10,
  }
});