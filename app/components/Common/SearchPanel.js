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
                normal: require('../../assets/button/btn_barcode.png'),
                highlight: require('../../assets/button/btn_barcode.png')
            } }
            onPress={() => {}}/>
          <TouchableOpacity style={ styles.btnSearchIcon }>
            <Icon size={25} name='md-search'></Icon>
          </TouchableOpacity>
          <TextInput placeholder='TÌM KIẾM' style={styles.inputText}/>
          <ImageButton
          style={ styles.btnSearch }
          appearance={ {
              normal: require('../../assets/button//btn_search.png'),
              highlight: require('../../assets/button/btn_search.png')
          } }
          onPress={() => {}}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  watchControlContainer: {
    backgroundColor: '#f3f3f3',
  },
  panel2: {
    flexDirection:'row',
    marginTop: 10
  },
  btnSearchIcon: {
    backgroundColor: '#ffffff',
    marginLeft: (Util.size.width > 1242) ? 30 : 15,
    height: 35,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    backgroundColor: '#ffffff',
    flex: 1,
    height: (Util.size.width > 1242) ? 35 : 35,
  },
  btnBarcode: {
    width: 35,
    height: 35,
    marginLeft: (Util.size.width > 1242) ? 45 : 15
  },
  textSearch: {
    marginLeft: (Util.size.width > 1242) ? 25 : 10,
    marginTop: 10,
    fontWeight: '500',
    fontSize: (Util.size.width > 1242) ? 16 : 11,
  },
  btnSearch: {
    width: 60,
    height: 35,
    marginLeft: (Util.size.width > 1242) ? 10 : 5,
    marginRight: (Util.size.width > 1242) ? 10 : 5
  }
});