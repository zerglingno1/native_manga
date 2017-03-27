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
              highlight: require('../../../public/button/btn_search.png')
          } }
          onPress={onPressButton}/>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  watchControlContainer: {
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    marginLeft: 20,
  },
  btn: {
    width: 60,
    height: 40,
    marginLeft: 10,
    marginRight: 20,
    marginBottom: 5,
    marginTop: 5
  }
});