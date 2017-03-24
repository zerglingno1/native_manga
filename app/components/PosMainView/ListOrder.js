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

export default class ListOrder extends Component{

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      });
    this.state = {
      dataSource,
      orders: {
        'order complete': [{title: 'item1'}, {title: 'item2'}, {title: 'item3'}],
        'order pending': [{title: 'item4'}, {title: 'item5'}, {title: 'item6'}],
      }
    };
  }

  render() {
    const { cStyles, onPressButton } = this.props;
    const { dataSource, orders } = this.state;
    let source = dataSource.cloneWithRowsAndSections(orders);
    
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
            <Picker
                style={styles.headPicker}
                mode="dialog">
                <Picker.Item label={`21-03-2017`} value={`21-03-2017`} />
                <Picker.Item label={`20-03-2017`} value={`20-03-2017`} />
            </Picker>
            </Image>)}
        renderSectionHeader={(sectionData, category) => (
            <Image source={require('../../assets/panel/bg_headline_small.png')} style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>{category}</Text>
            </Image>
        )}
        renderRow={(menu) => 
            <TouchableOpacity style={styles.rowView}>
                <Text style={styles.rowText}>{menu.title}</Text>
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
  sectionHeaderText: {
    paddingLeft: 10,
    color: '#ffffff',
    fontWeight: '400',
    backgroundColor: '#777',
    height: 30,
    width: Util.percentToPixel(35, Util.size.width),
  },
  rowText : {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headPicker: {
    width: 150,
    height: 30,
    marginRight: 10,
  },
  listHeader: {
    height: 40,
    width: Util.percentToPixel(35, Util.size.width),
    flexDirection: 'row', 
    alignItems: 'center',
  },
  sectionHeader: {
    backgroundColor: '#777',
    width: Util.percentToPixel(35, Util.size.width),
    height: 30
  },
  rowView: {
    width: Util.percentToPixel(35, Util.size.width),
    height: 40
  }
});