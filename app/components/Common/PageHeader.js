'use strict';

import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View } from 'react-native';
import Util from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';

export default class PageHeader extends Component{

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { navigator, index, cStyles } = this.props;
    return(
      <View style={[styles.watchControlContainer, cStyles]}>
        <TouchableOpacity
          underlayColor='transparent'
          onPress={() => {if (index > 0) {navigator.pop()}}}>
          <Text style={styles.navBackBtn}><Icon size={18} name='ios-arrow-back'></Icon> QUAY LẠI</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  watchControlContainer: {
    width: Util.size.width,
    height: 40,
    flexDirection:'row',
    backgroundColor: '#f3f3f3',
    paddingTop: 0, paddingLeft: 10, paddingRight: 30, paddingBottom: 0,
  },
  navBackBtn: {
    paddingTop: 10,
    paddingLeft: 10,
    fontSize: 18,
    color: '#555',
  },
});