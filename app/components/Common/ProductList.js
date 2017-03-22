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

export default class ProductList extends Component{

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource,
    };
  }

  render() {
    const { navigator, index, cStyles, chooseProduct, products, onGoBack } = this.props;
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
                  <Text style={styles.recordItemTitle}>{`Price : ${rowData.price} $`}</Text>)}
              </View>
            </TouchableOpacity>
          }/>)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  watchControlContainer: {
    backgroundColor: '#f3f3f3',
  },
  recordList: {
    paddingTop: 5, paddingLeft: 10, paddingRight: 10, paddingBottom: 5,
  },
  recordListContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap'
  },
  recordItem: {
    height: 100,
    width: 225,
    backgroundColor: '#f3f3f3',
    marginTop: 5, marginLeft: 5, marginRight: 15, marginBottom: 5,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#bbb',
  },
  recordItemTitle:{
    backgroundColor: 'transparent',
  },
  listHeader: {
    width: 480,
    height: 30,
    marginRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    flexDirection: 'row',
  },
  headerTitle: {
    marginRight: 10,
    width: 60,
    height: 30,
  },
  headerBorder: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#bbb',
  },
  listTitle: {
    width: 480,
    marginTop: 15,
    marginLeft: 10,
    marginBottom: 15
  }
});