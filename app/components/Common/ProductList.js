'use strict';

import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View, ListView, Image } from 'react-native';
import Util from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageButton from '../Common/ImageButton';

import styleSheet from '../../styles/Common/ProductList';

export default class ProductList extends Component{

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource,
    };
  }

  render() {
    const { cStyles, chooseProduct, products, onGoBack } = this.props;
    const { dataSource } =  this.state;

    let source = dataSource.cloneWithRows(products);
    return(
      <View style={[cStyles]}>
        <Text onPress={() => onGoBack()} style={styles.listTitle} >{'Product list'}</Text>
        <View style={styles.listHeader}>
            <View style={styles.headerBorder} ></View>
            <Text style={styles.headerTitle} >{'Sort'}</Text>
        </View>
        {source && (<ListView
          decelerationRate                  = "fast"
          snapToAlignment                   = "start"
          horizontal                        = {true}
          showsHorizontalScrollIndicator    = {true}
          showsVerticalScrollIndicator      = {false}
          style={styles.recordList}
          enableEmptySections = {true} 
          dataSource={source}
          contentContainerStyle={styles.recordListContainer}
          renderRow={(rowData) => 
            <TouchableOpacity underlayColor={'#bbb'} onPress={() => {chooseProduct(rowData);}}>
              <View style={styles.recordItem}>
                <Text style={[styles.recordItemTitle, {fontWeight: '500'}]}>{rowData.name}</Text>
                {rowData.type == 0 && (
                  <Text style={styles.recordItemTitle}>{`Price : ${rowData.price} yen`}</Text>)}
              </View>
            </TouchableOpacity>
          }/>)}
      </View>
    )
  }
}

const styles = styleSheet;