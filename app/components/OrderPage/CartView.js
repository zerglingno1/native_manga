'use strict';

import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  ScrollView, 
  ListView,
  TouchableOpacity, Image, Picker } from 'react-native';
import Util from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageButton from '../../components/Common/ImageButton';

import styleSheet from '../../styles/OrderPage/CartView';

export default class CartView extends Component{

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
    this.state = {
      dataSource
    };
  }

  render() {
    const { cStyles, onPressButton, carts } = this.props;
    const { dataSource } = this.state;
    let source = dataSource.cloneWithRows(carts);
    
    return(
      <View style={cStyles}>
        <ListView
        style={styles.watchControlContainer}
        ref='list'
        enableEmptySections = {true} 
        dataSource={source}
        renderSeparator={(sectionId, rowId) => <View style={styles.separator} />}
        renderHeader={() => (<Image source={require('../../../public/panel/bg_headline.png')} style={styles.listHeader}>
            <Text style={styles.headerTitle}>{'TIENG NHAT'}</Text>
            </Image>)}
        renderRow={(cart) => 
            <TouchableOpacity style={styles.rowView}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.rowText}>{cart.name}</Text>
                <ImageButton
                  style={ styles.discountBtn }
                  appearance={ {
                    normal: require('../../../public/button/btn_discount.png'),
                    highlight: require('../../../public/button/btn_tenkey_g.png'),
                  } }
                  onPress={() => {onPressButton(cart, 'discount')}}/>
                  <ImageButton
                  style={ styles.bottomBtn }
                  appearance={ {
                    normal: require('../../../public/button/btn_minus.png'),
                    highlight: require('../../../public/button/btn_tenkey_g.png'),
                  } }
                  onPress={() => {onPressButton(cart, 'minus');}}/>
                  <ImageButton
                  style={ styles.bottomBtn }
                  appearance={ {
                    normal: require('../../../public/button/btn_plus.png'),
                    highlight: require('../../../public/button/btn_tenkey_g.png'),
                  } }
                  onPress={() => {onPressButton(cart, 'add');}}/>
              </View>
              <Text style={styles.rowText}>{`Quantity: ${cart.quantity}`}</Text>
              <Text style={styles.rowText}>{`Price: ${cart.price}`}</Text>
            </TouchableOpacity>
        }/>
      </View>
    )
  }
}

const styles = styleSheet;