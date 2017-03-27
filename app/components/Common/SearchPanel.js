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

import styleSheet from '../../styles/Common/SearchPanel';

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

const styles = styleSheet();