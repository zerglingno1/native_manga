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
import PageHeader from '../../components/Common/PageHeader';
import Util from '../../utils/utils';
import CheerioUtil from '../../utils/CheerioUtil';
import StorageUtil from '../../utils/StorageUtil';
import FileUtil from '../../utils/FileUtil';
import ReadSavedManga from './ReadSavedManga';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default class SavedManga extends Component{
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
    let mangas = await StorageUtil.getSavedMangaList();
    StorageUtil.getSavedMultiManga(mangas, (list) => {
      this.setState({
        list
      });
    });
  }

  _openManga(row, manga) {
    const { navigator, index } = this.props;

    navigator.push({
      title: manga.title,
      index: index + 1,
      display: false,
      component: ReadSavedManga,
      data: manga
    });
  }

  async _deletePress(data) {
    await FileUtil.removeManga(data);
    let newList = await StorageUtil.removeMangaSaved(data);
    if (newList) {
      StorageUtil.getSavedMultiManga(newList, (list) => {
        this.setState({
          list
        });
      });
    }
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
          renderRow={(rowData) => 
            <TouchableOpacity underlayColor={'#bbb'} onPress={() => {
                this._openManga(this.rowID, rowData);
              }}>
              <View style={styles.recordItem}>
                <View style={{alignItems: 'center'}}>
                    <Image resizeMode='stretch' source={(rowData.image) ? {uri: rowData.image} : require('../../assets/images/w2.png')} style={styles.recordItemImage}/>
                </View>
                <Text style={styles.recordItemTitle}>{rowData.title} {' ( ' + Object.keys(rowData.chaps).length + ' CHAP ĐÃ LƯU )'} </Text>
                <TouchableOpacity style={styles.btnStyle} onPress={async () => await this._deletePress(rowData) }>
                  <MCIcon name='delete' color='#60B644' size={32}/>
                </TouchableOpacity>
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
  btnStyle: {
    width: 30,
    height: 30,
    marginLeft: 10,
  }
});

