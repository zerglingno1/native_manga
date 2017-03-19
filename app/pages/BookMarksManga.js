'use strict';

import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  ListView,
  Image, 
  TouchableHighlight, 
  BackAndroid } from 'react-native';
import Util from '../utils/utils';
import CheerioUtil from '../utils/CheerioUtil';
import StorageUtil from '../utils/StorageUtil';
import DetailManga from '../pages/DetailManga';
import axios from 'axios';

export default class BookMarksManga extends Component{
  constructor() {
    super();
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource,
      type: 'tatca',
      list: [],
    };
  }

  componentWillMount() {
    this._startLoad();

    BackAndroid.addEventListener('hardwareBackPress', () => {
      const { navigator, index } = this.props;
      if (index > 0) {navigator.pop()};
      BackAndroid.removeEventListener('hardwareBackPress');
      return true;
    });
    
  }

  componentDidMount() {
  }

  async _startLoad() {
    const { type, list } = this.state;
    let mangas = await StorageUtil.getBookMark();
    this.setState({
      list: mangas
    });
  }

  _openManga(row, manga) {
    const { navigator, index } = this.props;

    navigator.push({
      title: manga.title,
      index: index + 1,
      display: false,
      component: DetailManga,
      data: manga
    });
  }

  render() {
      const { type, list, dataSource } = this.state;
      let source = dataSource.cloneWithRows(list);
    return(
      <ScrollView style={styles.container} title={'title'}>
      {list && (<ListView
        style={styles.recordList}
        renderHeader = {() => <View style={{height: 10, backgroundColor: '#f5f5f5'}} />}
        enableEmptySections = {true} 
        dataSource={source}
        renderRow={(rowData) => 
          <TouchableHighlight underlayColor={'#bbb'} onPress={() => {
              this._openManga(this.rowID, rowData);
            }}>
            <View style={styles.recordItem}>
              <View style={{alignItems: 'center'}}>
                  <Image resizeMode='stretch' source={{uri: rowData.image}} style={styles.recordItemImage}/>
              </View>
              <Text style={styles.recordItemTitle}>{rowData.title}</Text>
            </View>
          </TouchableHighlight>
        }/>)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Util.size.height,
    width: Util.size.width,
    marginTop: 65,
  },
  recordList: {
    width: Util.size.width,
    height: Util.size.height - 100,
  },
  recordItem: {
    height: 80,
    borderBottomWidth: Util.pixel,borderBottomColor: '#bbb',
    paddingTop: 5, paddingLeft: 10, paddingRight: 10, paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  recordItemTitle:{
    backgroundColor: 'transparent',
    flex: 1,
    textAlign: 'right',
    paddingRight: 20,
    color: '#777'
  },
  recordItemImage:{
    backgroundColor: 'transparent',
    paddingLeft: 20,
    width: 80,
    flex: 1,
  },
});

