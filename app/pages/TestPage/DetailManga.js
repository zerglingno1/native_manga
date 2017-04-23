'use strict';

import React, { Component } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  ScrollView, 
  ListView,
  Image, 
  BackAndroid, 
  TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Util from '../../utils/utils';
import StorageUtil from '../../utils/StorageUtil';
import CheerioUtil from '../../utils/CheerioUtil';
import FileUtil from '../../utils/FileUtil';
import ReadManga from './ReadManga';
import PageHeader from '../../components/Common/PageHeader';
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

    this.setState({
      host: data.url
    });
    this._startLoad(data.url, data.manga);
    
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
    let chap = await StorageUtil.getHistory(data.manga.id);

    this.setState({
      history: chap
    });
  }

  componentDidMount() {
  }

  _startLoad(host, data) {
    switch(host) {
      case 'http://m.blogtruyen.com':
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
      break;
      case 'http://hamtruyen.vn':
        axios({method: 'GET', url: host + data.url, params: { }})
        .then(async (response) => {
          let detail = CheerioUtil.getDetailManga(response.data);
          this.setState({
            introduce: detail.introduce,
            chaps: detail.listChap
          });
        })
        .catch((error) => {
          console.warn(error);
        });
      break;
    }
  }

  _openChap(row, chap) {
    const { navigator, index, data } = this.props;
    const { host } = this.state;
    //set manga id
    navigator.push({
      title: 'ĐỌC TRUYỆN',
      index: index + 1,
      display: false,
      component: ReadManga,
      data: { chap, manga: data.manga, host }
    });
  }

  _savePress(chap) {
    const { navigator, index, data } = this.props;
    const { host } = this.state;

    let url =  host + chap.url;

    axios({method: 'GET', url, params: { }})
    .then(async (response) => {
      const { current } = this.state;
      let read = CheerioUtil.getReadManga(response.data, host);

      FileUtil.getMangaHTML(read.listPages, {title: chap.title, url: url}, data.manga);
    })
    .catch((error) => {
      console.warn(error);
    });
  }

  async _controlPress(action) {
    const { data } = this.props;
    const { host } = this.state;

    switch(action) {
      case 'bookmark':
        data.manga.host = host;
        await StorageUtil.saveBookMark(data.manga);
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
      const { data, navigator, index } = this.props;
      let source = dataSource.cloneWithRows(chaps);
    return(
      <View style={styles.container}>
        <PageHeader navigator={navigator} index={index} />
        <ScrollView>
        <Text style={[styles.faceIntroduce, {fontWeight: 'bold'}]}>{data.manga.title}</Text>
        <View style={styles.faceContainer}>
          {data.manga.image && (<Image resizeMode='stretch' source={{uri: data.manga.image}} style={styles.faceImage}/>)}
          {introduce != '' && (<Text style={styles.faceIntroduce}>{introduce}</Text>)}
        </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btnTextStyle} onPress={() => this._controlPress('read') }>
            <Text style={[styles.btnText, {color: '#ffffff'}]}>{'FULL CHAP'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnTextStyle} onPress={() => this._controlPress('continue') }>
            <Text style={[styles.btnText, {color: '#ffffff'}]}>{'ĐỌC TIẾP'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStyle} onPress={() => this._controlPress('bookmark') }>
            <Icon name='md-bookmark' color='#60B644' size={32}/>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.recordList}>
          <Text style={styles.recordListHeader}>{'CHAP MỚI'}</Text>
          <ListView
          style={styles.recordList}
          enableEmptySections = {true} 
          dataSource={source}
          contentContainerStyle={(Util.size.width > 800) ? {flexDirection: 'row', flexWrap: 'wrap'} : {}}
          pageSize={(Util.size.width > 800) ? 999999999 : 20}
          renderRow={(rowData) => 
          <TouchableOpacity underlayColor={'#bbb'} onPress={() => {
              this._openChap(this.rowID, rowData);
            }}>
            <View style={styles.recordItem}>
              <Text style={styles.recordItemTitle}>{rowData.title}</Text>
              <Text style={styles.recordItemTime}>{rowData.date}</Text>
              <TouchableOpacity style={styles.btnStyle} onPress={() => this._savePress(rowData) }>
                <MCIcon name='content-save' color='#60B644' size={32}/>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
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
  recordListHeader: {
    width: Util.size.width,
    paddingLeft: 30,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  faceImage: {
    paddingRight: 30,
    paddingTop: 0,
    height: 180,
    width: (Util.size.width > 800) ? 180 : undefined,
    flex: (Util.size.width > 800) ? 0 : 1,
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
    height: Util.size.height - 250 - 90,
    backgroundColor: '#bbb',
  },
  recordItem: {
    width: (Util.size.width > 800) ? Util.size.width / 2 : Util.size.width,
    flex: 1,
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
    alignItems: 'center',
    justifyContent: 'center',
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
    justifyContent: 'center',
    flex: 1
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
    justifyContent: 'center',
    flex: 1
  },
});

