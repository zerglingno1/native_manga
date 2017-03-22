'use strict';

import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Image } from 'react-native';
import Util from '../../utils/utils';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import SearchPanel from '../Common/SearchPanel';
import ProductList from '../Common/ProductList';

export default class ProductSearch extends Component{

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { navigator, index, cStyles, chooseProduct, products, onGoBack } = this.props;
    return(
      <View style={[styles.watchControlContainer, cStyles]}>
        <SearchPanel 
          navigator={navigator} 
          index={index}
          cStyles={styles.searchPanel}/>
        <ProductList 
          navigator={navigator} 
          index={index}
          chooseProduct={(item) => chooseProduct(item)}
          products={products}
          onGoBack={() => onGoBack()}
          cStyles={styles.productList}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  watchControlContainer: {
    backgroundColor: 'transparent',
  },
  searchPanel: {
    width: 480,
    height: 80
  },
  productList: {
    marginTop: 10,
    width: 480,
    height: 560
  },
});