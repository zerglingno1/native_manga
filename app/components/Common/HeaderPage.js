'use strict';

import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Image } from 'react-native';
import Util from '../../utils/utils';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import styleSheet from '../../styles/Common/HeaderPage';

export default class PageHeader extends Component{

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { navigator, index, cStyles, _goBack } = this.props;
    return(
      <View style={[styles.watchControlContainer, cStyles]}>
        <TouchableOpacity
        style={styles.btnBack}
          underlayColor='transparent'
          onPress={_goBack}>
          <Text style={styles.navBackBtn}><Icon size={40} name='arrow-left-circle'></Icon></Text>
        </TouchableOpacity>
        <Image style={styles.logoImage} source={require('../../../public/images/logo_top.png')} />
      </View>
    )
  }
}

const styles = styleSheet();