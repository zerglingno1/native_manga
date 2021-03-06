'use strict';

import React,{ Component } from 'react';
import {
  StyleSheet,
  Text,
  View, 
  ScrollView, 
  ListView,
  TouchableOpacity, Image, Picker, Platform } from 'react-native';
import Util from '../../utils/utils';
import Icon from 'react-native-vector-icons/Ionicons';
import {Select, Option} from "react-native-chooser";


import styleSheet from '../../styles/PosMainView/ListOrder';

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

  renderHeader() {
    if (Platform.OS === 'ios') {
      let data = [
            { key: '21-03-2017', label: '21-03-2017' },
            { key: '20-03-2017', label: '20-03-2017' },
        ];
      return (<Image source={require('../../../public/panel/bg_headline.png')} style={styles.listHeader}>
             <Text style={styles.headerTitle}>{'TIENG NHAT'}</Text>
             <Select
              defaultText  = "Select Order Day"
              style = {styles.headPicker}
            >
              <Option value = '20-03-2017'>{'20-03-2017'}</Option>
              <Option value = '21-03-2017'>{'21-03-2017'}</Option>
            </Select>
          </Image>);
    } else if (Platform.OS === 'windows') {
      return (<Image source={require('../../../public/panel/bg_headline.png')} style={styles.listHeader}>
            <Text style={styles.headerTitle}>{'TIENG NHAT'}</Text>
            <Picker
                style={styles.headPicker}
                mode="dialog">
                <Picker.Item label={`21-03-2017`} value={`21-03-2017`} />
                <Picker.Item label={`20-03-2017`} value={`20-03-2017`} />
            </Picker>
          </Image> );
    }
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
        renderHeader={this.renderHeader}
        renderSectionHeader={(sectionData, category) => (
            <Image source={require('../../../public/panel/bg_headline_small.png')} style={styles.sectionHeader}>
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

const styles = styleSheet;