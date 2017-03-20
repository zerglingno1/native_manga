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
import Util from '../utils/utils';
import CheerioUtil from '../utils/CheerioUtil';
import DetailManga from '../pages/DetailManga';
import PageHeader from '../components/Common/PageHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default class HotManga extends Component{
  constructor() {
    super();
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource,
      type: '/truyenhot',
      total: 0,
      list: [],
      url: 'http://m.blogtruyen.com',
      page: '1',
      paging: [],
    };
    
  }

  componentWillMount() {
    const { data } = this.props;

    BackAndroid.addEventListener('hardwareBackPress', () => {
      const { navigator, index } = this.props;
      if (index > 0) {navigator.pop()};
      BackAndroid.removeEventListener('hardwareBackPress');
      return true;
    });

    let type = (data && data.type) ? data.type : false;
    if (type) {
      this.setState({
        type
      });
    }
    this._startLoad(false, type);
  }

  componentDidMount() {
  }

  _startLoad(num, mType = false) {
    const { type, list, url, page } = this.state;
    let path = url;
    path += (mType) ? mType : type;
    path += (num) ?  '?p=' + num :  '?p=' + page;
    axios({method: 'GET', url: path, params: { }})
      .then(async (response) => {
        const { type } = this.state;

        let mangas = CheerioUtil.getListManga(response.data);
        mangas.total = mangas.total.replace(type + '?p=', '');

        this.setState({
          list: mangas.listManga,
          total: mangas.total,
          paging: this.makePaging(mangas.total)
        });
      })
      .catch((error) => {
        console.warn(error);
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

  _controlPress(action) {
    const { total } = this.state;
    let { page } = this.state;

    switch(action) {
      case 'back':
        if (page > 1) {
          this.setState({
            page: (Number(page) - 1)
          });
          this._startLoad((Number(page) - 1));
          this.refs.listManga.scrollTo({x: 0,y: 0,animated: false});
        }
      break;
      case 'next':
        if (page < total) {
          this.setState({
            page: (Number(page) + 1)
          });
          this._startLoad((Number(page) + 1));
          this.refs.listManga.scrollTo({x: 0,y: 0,animated: false});
        }
      break;
    }
  }

  _onValueChange = (value) => {
    this.setState({
      page: value
    });
    this._startLoad(value);
    this.refs.listManga.scrollTo({x: 0,y: 0,animated: false});
  };

  makePaging(total) {
    let pages = [];
    for(let i = 1; i <= total; i++) {
      pages.push({title: `TRANG ${i}`, page: String(i)});
    }
    return pages;
  }


  render() {
    const { type, list, test, dataSource, page, total, paging } = this.state;
    const { navigator, index } = this.props;

    let source = dataSource.cloneWithRows(list);
    
    return(
      <ScrollView  style={styles.container}>
      <PageHeader navigator={navigator} index={index} />
      <ListView
        style={styles.recordList}
        ref='listManga'
        scrollsToTop={true}
        renderHeader = {() => <View style={{height: 10, backgroundColor: '#f5f5f5'}} />}
        enableEmptySections = {true} 
        dataSource={source}
        renderRow={(rowData) => 
        <TouchableOpacity underlayColor={'#bbb'} onPress={() => {
            this._openManga(this.rowID, rowData);
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
    height: Util.size.height - 40 - 50,
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
    width: 200,
    height: 40
  },
  currentPage: {
    fontSize: 16,
    paddingTop: 8,
    height: 40
  },

});

