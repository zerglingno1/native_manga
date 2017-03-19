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
  BackAndroid, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../utils/utils';
import StorageUtil from '../utils/StorageUtil';
import CheerioUtil from '../utils/CheerioUtil';
import ReadManga from '../pages/ReadManga';
import axios from 'axios';

export default class DetailManga extends Component{
  constructor() {
    super();
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource,
      introduce: '',
      chaps: [],
      current: {},
      chap: '',
      host: 'http://m.blogtruyen.com',
      history: false
    };
  }

  componentWillMount() {
    const { host } = this.state;
    const { data } = this.props;
    this._startLoad(host, data);
    
    BackAndroid.addEventListener('hardwareBackPress', () => {
      const { navigator, index } = this.props;
      if (index > 0) {navigator.pop()};
      BackAndroid.removeEventListener('hardwareBackPress');
      return true;
    });

    this.loadHistory();
  }

  async loadHistory() {
    const { data } = this.props;
    let chap = await StorageUtil.getHistory(data.id);

    this.setState({
      history: chap
    });
  }

  componentDidMount() {
  }

  _startLoad(host, data) {
    axios({method: 'GET', url: host + data.url, params: { }})
      .then(async (response) => {
        let introduce = CheerioUtil.getDetailMangaIntroduce(response.data);
        this.setState({
          introduce
        });
        axios({method: 'GET', url: host + '/ajax/Chapter/LoadListChapter?id=' + data.id, params: { }})
        .then(async (response) => {
          let chaps = CheerioUtil.getDetailMangaChaps(response.data);
          this.setState({
            chaps
          });
        })
        .catch((error) => {
          console.warn(error);
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  _openChap(row, manga) {
    const { navigator, index, data } = this.props;
    //set manga id
    manga.id = data.id;
    navigator.push({
      title: 'ĐỌC TRUYỆN',
      index: index + 1,
      display: false,
      component: ReadManga,
      data: manga
    });
  }

    async _controlPress(action) {
    const { data } = this.props;

    switch(action) {
      case 'bookmark':
        await StorageUtil.saveBookMark(data);
      break;
      case 'bookmarks':
        if (next && next != current) {
          this.loadManga(next);
        }
      break;
      case 'read':
        const { chaps } = this.state;
        this._openChap(null, chaps[chaps.length - 1]);
      break;
      case 'continue':
        const { history } = this.state;
        if (history) {
          this._openChap(null, history);
        }
      break;
    }
  }

  render() {
      const { chaps, dataSource, introduce, host } = this.state;
      const { data } = this.props;
      let source = dataSource.cloneWithRows(chaps);
    return(
      <View style={styles.container}>
        <ScrollView>
        <View style={styles.faceContainer}>
          <Image resizeMode='stretch' source={{uri: data.image}} style={styles.faceImage}/>
          <Text style={styles.faceIntroduce}>{introduce}</Text>
        </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btnTextStyle} onPress={() => this._controlPress('read') }>
            <Text style={[styles.btnText, {color: '#ffffff'}]}>{'ĐỌC TRUYỆN'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnTextStyle} onPress={() => this._controlPress('continue') }>
            <Text style={[styles.btnText, {color: '#ffffff'}]}>{'ĐỌC TIẾP'}</Text>
          </TouchableOpacity>
          <TouchableHighlight style={styles.btnStyle} onPress={() => this._controlPress('bookmark') }>
            <Icon name='md-bookmark' color='#60B644' size={32}/>
          </TouchableHighlight>
          <TouchableHighlight style={styles.btnStyle} onPress={() => this._controlPress('bookmarks') }>
            <Icon name='md-bookmarks' color='#60B644' size={32}/>
          </TouchableHighlight>
        </View>
        <ScrollView style={styles.recordList}>
          <ListView
          style={styles.recordList}
          enableEmptySections = {true} 
          dataSource={source}
          renderRow={(rowData) => 
          <TouchableHighlight underlayColor={'#bbb'} onPress={() => {
              this._openChap(this.rowID, rowData);
            }}>
            <View style={styles.recordItem}>
              <Text style={styles.recordItemTitle}>{rowData.title}</Text>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.recordItemTime}>{rowData.date}</Text>
              </View>
            </View>
          </TouchableHighlight>
          }/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: Util.size.height,
    width: Util.size.width,
    //marginTop: 65,
    marginTop: 0
  },
  faceContainer: {
    width: Util.size.width,
    paddingLeft: 30, paddingRight:30,
    backgroundColor: '#fff',
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd',
    height: 190,
    flexDirection: 'row'
  },
  buttonContainer: {
    width: Util.size.width,
    paddingLeft: 30, paddingRight:30,
    paddingTop: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd',
    height: 60,
    flexDirection: 'row'
  },
  faceImage: {
    paddingRight: 30,
    //left: Util.size.width - 140,
    paddingTop: 0,
    height: 180,
    flex: 1,
  },
  faceIntroduce: {
    width: Util.size.width * 80 / 100,
    fontSize: 20,
    fontWeight: '100',
    color: '#222',
    flex: 1,
    paddingLeft: 20
  },
  recordList: {
    width: Util.size.width,
    height: Util.size.height - 250 - 65,
    backgroundColor: '#bbb',
  },
  recordItem: {
    height: 80,
    backgroundColor: '#ffffff',
    borderBottomWidth: Util.pixel,borderBottomColor: '#ffffff',
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

  btnStyle: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: 'transparent',
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnTextStyle: {
    marginRight: 5,
    width: 200,
    height: 50,
    borderRadius: 35,
    backgroundColor: '#60B644',
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

