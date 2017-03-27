'use strict';

import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View, TextInput } from 'react-native';
import Util from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageButton from '../Common/ImageButton';

export default class SearchPanel extends Component{

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { cStyles } = this.props;
    return(
      <View style={[styles.watchControlContainer, cStyles]}>
        <Text style={styles.textSearch}>{'TIẾNG NHẬT'}</Text>
        <View style={ styles.panel2 }>
          <ImageButton
            style={ styles.btnBarcode }
            appearance={ {
                normal: require('../../../public/button/btn_barcode.png'),
                highlight: require('../../../public/button/btn_barcode.png')
            } }
            onPress={() => {}}/>
          <TouchableOpacity style={ styles.btnSearchIcon }>
            <Icon size={25} name='md-search'></Icon>
          </TouchableOpacity>
          <TextInput placeholder='TÌM KIẾM' style={styles.inputText}/>
          <ImageButton
          style={ styles.btnSearch }
          appearance={ {
              normal: require('../../../public/button//btn_search.png'),
              highlight: require('../../../public/button/btn_search.png')
          } }
          onPress={() => {}}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  watchControlContainer: {
    height: 200,
    backgroundColor: '#f3f3f3',
  },
  panel2: {
    flexDirection:'row',
    marginTop: 10
  },
  btnSearchIcon: {
    backgroundColor: '#ffffff',
    marginLeft: 30,
    height: 35,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    backgroundColor: '#ffffff',
    width: 240,
    height: 35,
  },
  btnBarcode: {
    width: 35,
    height: 35,
    marginLeft: 45
  },
  textSearch: {
    marginLeft: 25,
    marginTop: 10,
    fontWeight: '500'
  },
  btnSearch: {
    width: 60,
    height: 35,
    marginLeft: 10
  }
});