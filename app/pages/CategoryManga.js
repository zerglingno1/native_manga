'use strict';

import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  ListView,
  Image, 
  TouchableOpacity, 
  BackAndroid } from 'react-native';
import PageHeader from '../components/Common/PageHeader';
import Util from '../utils/utils';
import CheerioUtil from '../utils/CheerioUtil';
import StorageUtil from '../utils/StorageUtil';
import HotManga from '../pages/HotManga';
import axios from 'axios';

export default class CategoryManga extends Component{
  constructor() {
    super();
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource,
      type: 'tatca',
      list: [{
        title: 'Action',
        url: '/theloai/action'
      }, {
        title: 'Adventure',
        url: '/theloai/adventure'
      }, {
        title: 'Comedy',
        url: '/theloai/comedy'
      }, {
        title: 'Fantasy',
        url: '/theloai/fantasy'
      }, {
        title: 'Horror',
        url: '/theloai/horror'
      }, {
        title: 'Mature',
        url: '/theloai/mature'
      }, {
        title: 'Romance',
        url: '/theloai/romance'
      }, {
        title: 'School life',
        url: '/theloai/school-life'
      }, {
        title: 'Sci-fi',
        url: '/theloai/sci-fi'
      }, {
        title: 'Sports',
        url: '/theloai/sports'
      }, {
        title: 'Detective',
        url: '/theloai/trinh-tham'
      }, {
        title: 'Adult',
        url: '/theloai/adult'
      }, {
        title: '16+',
        url: '/theloai/16'
      }, {
        title: '18+',
        url: '/theloai/18'
      }, {
        title: 'Ecchi',
        url: '/theloai/ecchi-new'
      }, {
        title: 'Game',
        url: '/theloai/game'
      }, {
        title: 'Anime',
        url: '/theloai/anime'
      }, {
        title: 'Manga',
        url: '/theloai/manga'
      }, {
        title: 'Historical',
        url: '/theloai/historical'
      }],
    };
  }

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const { navigator, index } = this.props;
      if (index > 0) {navigator.pop()};
      BackAndroid.removeEventListener('hardwareBackPress');
      return true;
    });
    
  }

  componentDidMount() {
  }

  _openManga(row, type) {
    const { navigator, index } = this.props;
    navigator.push({
      title: type.title,
      index: index + 1,
      display: false,
      component: HotManga,
      data: {type: type.url}
    });
  }

  render() {
      const { type, list, dataSource } = this.state;
      const { navigator, index } = this.props;
      let source = dataSource.cloneWithRows(list);
    return(
      <ScrollView style={styles.container}>
        <PageHeader navigator={navigator} index={index} />
        {list && (<ListView
          style={styles.recordList}
          renderHeader = {() => <View style={{height: 10, backgroundColor: '#f5f5f5'}} />}
          enableEmptySections = {true} 
          dataSource={source}
          contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}
          renderRow={(rowData) => 
            <TouchableOpacity underlayColor={'#bbb'} onPress={() => {
                this._openManga(this.rowID, rowData);
              }}>
              <View style={styles.recordItem}>
                <Text style={styles.recordItemTitle}>{rowData.title}</Text>
              </View>
            </TouchableOpacity>
          }/>)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Util.size.height,
    width: Util.size.width,
    //marginTop: 65,
    marginTop: 0,
  },
  recordList: {
    width: Util.size.width,
    height: Util.size.height - 40,
    paddingTop: 5, paddingLeft: 10, paddingRight: 10, paddingBottom: 5,
  },
  recordItem: {
    height: 130,
    width: 130,
    backgroundColor: '#f3f3f3',
    marginTop: 15, marginLeft: 15, marginRight: 15, marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  recordItemTitle:{
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: '#60B644'
  },
});

