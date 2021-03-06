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

import styleSheet from '../../styles/OrderPage/ProductSearch';

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

const styles = styleSheet;