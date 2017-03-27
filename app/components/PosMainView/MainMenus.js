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

import styleSheet from '../../styles/PosMainView/MainMenus';

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
        source={require('../../../public/button/icon_arrow_left.png')}/>
        <ListView
          style={styles.watchControlContainer}
          ref='list'
          horizontal = {true}
          showsHorizontalScrollIndicator= {true}
          enableEmptySections = {true} 
          dataSource={source}
          renderRow={(menu) => 
          <TouchableOpacity style={styles.btn}>
            <Image style={styles.imgBtn} source={require('../../../public/button/btn_tenkey_g.png')}>
              <Text>{menu.title}</Text>
            </Image>
          </TouchableOpacity>
          }/>
        <Image
          style={styles.navigatorRight}
          source={require('../../../public/button/icon_arrow_right.png')}/>
      </View>
    )
  }
}

const styles = styleSheet();