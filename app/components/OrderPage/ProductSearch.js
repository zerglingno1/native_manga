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
    const { cStyles, chooseProduct, products, onGoBack } = this.props;
    return(
      <View style={[styles.watchControlContainer, cStyles]}>
        <SearchPanel 
          cStyles={styles.searchPanel}/>
        <ProductList 
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
    width: (Util.size.width > 1242) ? Util.percentToPixel(25, Util.size.width) : Util.percentToPixel(30, Util.size.width),
    height: 80
  },
  productList: {
    marginTop: 10,
    width: (Util.size.width > 1242) ? Util.percentToPixel(25, Util.size.width) : Util.percentToPixel(30, Util.size.width),
    height: (Util.size.width > 1242) ? Util.percentToPixel(55, Util.size.height) : Util.percentToPixel(45, Util.size.height)
  },
});