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
        renderHeader={() => (<Image source={require('../../assets/panel/bg_headline.png')} style={styles.listHeader}>
            <Text style={styles.headerTitle}>{'TIENG NHAT'}</Text>
            </Image>)}
        renderRow={(cart) => 
            <TouchableOpacity style={styles.rowView}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.rowText}>{cart.name}</Text>
                <ImageButton
                  style={ styles.discountBtn }
                  appearance={ {
                    normal: require('../../assets/button/btn_discount.png'),
                    highlight: require('../../assets/button/btn_tenkey_g.png'),
                  } }
                  onPress={() => {onPressButton(cart, 'discount')}}/>
                  <ImageButton
                  style={ styles.bottomBtn }
                  appearance={ {
                    normal: require('../../assets/button/btn_minus.png'),
                    highlight: require('../../assets/button/btn_tenkey_g.png'),
                  } }
                  onPress={() => {onPressButton(cart, 'minus');}}/>
                  <ImageButton
                  style={ styles.bottomBtn }
                  appearance={ {
                    normal: require('../../assets/button/btn_plus.png'),
                    highlight: require('../../assets/button/btn_tenkey_g.png'),
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

const styles = StyleSheet.create({
  watchControlContainer: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  headerTitle: {
    marginLeft: 10,
    flex: 1,
    fontWeight: '500'
  },
  rowText : {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  headPicker: {
    width: 150,
    height: 30,
    marginRight: 10,
  },
  listHeader: {
    height: 40,
    width: Util.percentToPixel(25, Util.size.width),
    flexDirection: 'row', 
    alignItems: 'center',
  },
  rowView: {
    width: Util.percentToPixel(25, Util.size.width),
    height: 100,
    paddingTop: 10, paddingLeft: 10, paddingRight: 10
  },
  bottomBtn: {
    width: 40,
    height: 40,
  },
  discountBtn: {
    width: 60,
    height: 40,
  },
});