'use strict';

import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Image } from 'react-native';
import Util from '../../utils/utils';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

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
        style={styles.btnBack}
          underlayColor='transparent'
          onPress={() => {if (index > 0) {navigator.pop()}}}>
          <Text style={styles.navBackBtn}><Icon size={40} name='arrow-left-circle'></Icon></Text>
        </TouchableOpacity>
        <Image style={styles.logoImage} source={require('../../assets/images/logo_top.png')} />
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
  logoImage: {
    marginLeft: 80
  },
  btnBack: {
  },
  navBackBtn: {
    marginTop: 2,
    height: 45,
    width: 45,
    fontSize: 25,
    color: '#555',
  },
});