'use strict';

import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View, 
  Image } from 'react-native';
import Util from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageButton from '../../components/Common/ImageButton';

import styleSheet from '../../styles/PosMainView/SearchPanel';

export default class SearchPanel extends Component{

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { cStyles, onPressButton } = this.props;
    
    return(
      <Image style={[styles.watchControlContainer, cStyles]} source={require('../../../public/panel/bg_search_member.png')}>
        <TextInput style={ styles.input } placeholder='type your id' />
        <ImageButton
          style={ styles.btn }
          appearance={ {
              normal: require('../../../public/button/btn_search.png'),
              highlight: require('../../../public/button/btn_tenkey_g.png')
          } }
          onPress={onPressButton}/>
      </Image>
    )
  }
}

const styles = styleSheet;