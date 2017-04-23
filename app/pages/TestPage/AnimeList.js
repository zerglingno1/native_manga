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
  BackAndroid, 
  Picker } from 'react-native';
import Util from '../../utils/utils';
import CheerioUtil from '../../utils/CheerioUtil';
import ViewAnime from './ViewAnime';
import PageHeader from '../../components/Common/PageHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default class AnimeList extends Component{
  constructor() {
    super();
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource,
      host: 'http://anime47.com/',
      total: 0,
      list: [],
      url: 'http://anime47.com/tim-nang-cao/?status=&season=&year=&sort=@sort@&keyword=@search@&page=@page@',
      page: '1',
      paging: [],
    };
  
  }

  componentWillMount() {
    const { url } = this.state;

    BackAndroid.addEventListener('hardwareBackPress', () => {
      const { navigator, index } = this.props;
      if (index > 0) {navigator.pop()};
      BackAndroid.removeEventListener('hardwareBackPress');
      return true;
    });
    this._startLoad(url);
  }

  componentDidMount() {
  }

  _startLoad(murl, page = 1, search = '', sort = 'popular') {
    murl = murl.replace('@search@', search);
    murl = murl.replace('@page@', page);
    murl = murl.replace('@sort@', sort);
    console.warn(murl);
    axios({method: 'GET', url: murl, params: { }, headers: {
      'Host': 'anime47.com',
      'Pragma': 'no-cache',
      'Upgrade-Insecure-Requests': 1,
      'Referer': 'http://anime47.com/tim-nang-cao/?status=&season=&year=&sort=popular&keyword=',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36',
      'Cookie': '__cfduid=df96b6c0b3343f8f631a3b8927e89bbea1490422966; cf_clearance=afea2253a54e7109b4da0e82f6f8b17f1a03a0f2-1490422972-604800; cpmStarPopUnder67388=1490422991492; PHPSESSID=rema5h2nl8vss95k170ujvnpk1; __RC=31; __R=2; __UF=1%2C4; __uif=__uid%3A2188102211712316952%7C__ui%3A1%2C4%7C__create%3A1488102211; __tb=0; __IP=712007108; lcache=1;'
    }})
      .then(async (response) => {
        let animes = CheerioUtil.getAnimes(response.data);
        this.setState({
          list: animes.listAnimes,
          total: animes.total,
          paging: this.makePaging(animes.total)
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  makePaging(total) {
    let pages = [];
    for(let i = 1; i <= total; i++) {
      pages.push({title: `TRANG ${i}`, page: String(i)});
    }
    return pages;
  }

  _onValueChange = (value) => {
    const { url } = this.state;
    this.setState({
      page: value,
    });
    this._startLoad(url, value);
    this.refs.listManga.scrollTo({x: 0,y: 0,animated: false});
  };

  _controlPress(action) {
    const { total } = this.state;
    let { page, url } = this.state;

    switch(action) {
      case 'back':
        if (page > 1) {
          this.setState({
            page: (Number(page) - 1)
          });
          this._startLoad(url, (Number(page) - 1));
          this.refs.listManga.scrollTo({x: 0,y: 0,animated: false});
        }
      break;
      case 'next':
        if (page < total) {
          this.setState({
            page: (Number(page) + 1)
          });
          this._startLoad(url, (Number(page) + 1));
          this.refs.listManga.scrollTo({x: 0,y: 0,animated: false});
        }
      break;
    }
  }

  _openAnime(row, anime) {
    const { navigator, index } = this.props;
    const { host } = this.state;

    navigator.push({
      title: anime.title,
      index: index + 1,
      display: false,
      component: ViewAnime,
      data: {anime, host}
    });
  }

  render() {
    const { type, list, dataSource, types, page, total, paging, url } = this.state;
    const { navigator, index } = this.props;

    let source = dataSource.cloneWithRows(list);
    
    return(
      <ScrollView  style={styles.container}>
      <PageHeader navigator={navigator} index={index} />
      <ListView
        style={styles.recordList}
        ref='listManga'
        scrollsToTop={true}
        contentContainerStyle={(Util.size.width > 800) ? {flexDirection: 'row', flexWrap: 'wrap'} : {}}
        renderHeader = {() => <View style={{height: 10, backgroundColor: '#f5f5f5'}} />}
        pageSize={(Util.size.width > 800) ? 999999999 : 20}
        enableEmptySections = {true} 
        dataSource={source}
        renderRow={(rowData) => 
        <TouchableOpacity underlayColor={'#bbb'} onPress={() => {
            this._openAnime(this.rowID, rowData);
          }}>
          <View style={styles.recordItem}>
            <View style={{alignItems: 'center'}}>
                <Image resizeMode='stretch' source={{uri: rowData.image}} style={styles.recordItemImage}/>
            </View>
            <Text style={styles.recordItemTitle}>{rowData.title}</Text>
          </View>
        </TouchableOpacity>
        }/>
        <View style={styles.faceContainer}>
          <Text style={styles.currentPage}>{`TRANG ${page}`}</Text>
          <TouchableOpacity style={styles.btnStyle} onPress={() => this._controlPress('back') }>
            <Icon name='md-arrow-round-back' color='#60B644' size={32}/>
          </TouchableOpacity>
          <Picker
            style={styles.picker}
            onValueChange={this._onValueChange}
            selectedValue={page}
            mode="dialog">
            {paging && paging.map((type) => (<Picker.Item label={`${type.title}`} value={`${type.page}`} />))}
          </Picker>
          <TouchableOpacity style={styles.btnStyle} onPress={() => this._controlPress('next') }>
            <Icon name='md-arrow-round-forward' color='#60B644' size={32}/>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  recordList: {
    width: Util.size.width,
    height: Util.size.height - 40 - 50 - 80,
    backgroundColor: '#f3f3f3'
  },
  recordItem: {
    width: (Util.size.width > 800) ? Util.size.width / 2 - 10 * 2 : Util.size.width - 20,
    flex: 1,
    height: 80,
    borderBottomWidth: Util.pixel,borderBottomColor: '#bbb',
    paddingTop: 5, paddingLeft: 10, paddingRight: 10, paddingBottom: 5,
    marginLeft: 10, marginRight: 10, marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff'
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
  faceContainer: {
    width: Util.size.width,
    paddingLeft: 30, paddingRight:30,
    paddingTop: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd',
    height: 50,
    flexDirection: 'row'
  },
  btnStyle: {
    width: 40,
    height: 40,
    borderRadius: 35,
    backgroundColor: 'transparent',
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  picker: {
    flex: 1,
    height: 40
  },
  currentPage: {
    fontSize: 16,
    paddingTop: 8,
    height: 40
  },

  typeContainer: {
    width: Util.size.width,
    paddingLeft: 10, paddingRight:10,
    backgroundColor: '#fff',
    height: 40,
    flexDirection: 'row'
  },
  btnText: {
    fontSize: 14,
    backgroundColor: 'transparent',
    color: '#60B644',
  },
});

