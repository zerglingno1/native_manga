'use strict';

import React,{ Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  View } from 'react-native';
import Util from '../../utils/utils';

export default class TestRecord extends Component {
  constructor() {
      super();
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        dataSource: ds
      };
  }

  render() {
    const { record } = this.props;
    const { dataSource } = this.state;
    let source = dataSource.cloneWithRows(record);
    return (
      <ListView
        style={styles.recordList}
        dataSource={source}
        renderRow={(rowData) => 
          <View style={styles.recordItem}>
            <Text style={styles.recordItemTitle}>{rowData.name}</Text>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.recordItemTime}>{rowData.create_date}</Text>
            </View>
          </View>
          }/>
    );
  }
}

const styles = StyleSheet.create({
  recordList: {
    width: Util.size.width,
    height: Util.size.height - 300,
    paddingLeft: 15,
  },
  recordItem: {
    height: 40,
    borderBottomWidth: Util.pixel,borderBottomColor: '#bbb',
    paddingTop: 5, paddingLeft: 10, paddingRight: 10, paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  recordItemTitle:{
    backgroundColor: 'transparent',
    flex: 1,
    textAlign: 'left',
    paddingLeft: 20,
    color: '#777'
  },
  recordItemTime:{
    backgroundColor: 'transparent',
    flex: 1,
    textAlign: 'right',
    paddingRight: 20,
    color: '#222'
  },
});