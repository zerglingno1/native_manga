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
import DetailManga from './DetailManga';
import PageHeader from '../../components/Common/PageHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default class ListManga extends Component{
  constructor() {
    super();
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource,
      type: '/danhsach/index.html?sort=1',
      types: [],
      total: 0,
      list: [],
      url: 'http://hamtruyen.vn',
      page: '1',
      paging: [],
    };
    
    this._startLoad(false, false);
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

  _startLoad(murl, num, mType = false) {
    const { type, list, url, page } = this.state;
    let path = (murl) ? murl : url;
    let myPath = path;
    let numPage = (num) ? num : page;
    let myType = (mType) ? mType : type;
    
    switch (myPath) {
      case 'http://m.blogtruyen.com':
        path += myType;
        path += '?p=' + numPage;
      break;
      case 'http://hamtruyen.vn':
        myType = myType.replace('/index.html', `/P${numPage}/index.html` );
        path += myType;
      break;
    }
    axios({method: 'GET', url: path, params: { }})
      .then(async (response) => {
        const { type } = this.state;

        
        let mangas = CheerioUtil.getListManga(response.data, myPath);
        
        switch (myPath) {
          case 'http://m.blogtruyen.com':
            mangas.total = mangas.total.replace(type + '?p=', '');
          break;
          case 'http://hamtruyen.vn':
            let numPage = (num) ? num : page;
            if (numPage == 1 || numPage == mangas.total - 1) {
              mangas.total = mangas.total - 1;
            } else {
              mangas.total = mangas.total - 2;
            }
          break;
        }

        this.setState({
          list: mangas.listManga,
          types: mangas.listTypes,
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
    const { url } = this.state;

    navigator.push({
      title: manga.title,
      index: index + 1,
      display: false,
      component: DetailManga,
      data: {manga, url}
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
          this._startLoad(false, (Number(page) - 1));
          this.refs.listManga.scrollTo({x: 0,y: 0,animated: false});
        }
      break;
      case 'next':
        if (page < total) {
          this.setState({
            page: (Number(page) + 1)
          });
          this._startLoad(false, (Number(page) + 1));
          this.refs.listManga.scrollTo({x: 0,y: 0,animated: false});
        }
      break;
    }
  }

  _onValueChange = (value) => {
    this.setState({
      page: value,
    });
    this._startLoad(false, value);
    this.refs.listManga.scrollTo({x: 0,y: 0,animated: false});
  };

  _onProviderChange = (value) => {
    let type = (value == 'http://m.blogtruyen.com') ? '/danhsach/tatca' : '/danhsach/index.html?sort=1';
    this.setState({
      url: value,
      type
    });
    this._startLoad(value, false, type);
    this.refs.listManga.scrollTo({x: 0,y: 0,animated: false});
  };

  makePaging(total) {
    let pages = [];
    for(let i = 1; i <= total; i++) {
      pages.push({title: `TRANG ${i}`, page: String(i)});
    }
    return pages;
  }

  _controlPressType = (item) => {
    const { page } = this.state;
    this.setState({
      type: item.url,
      page: '1'
    });
    this._startLoad(false, '1', item.url);
    this.refs.listManga.scrollTo({x: 0,y: 0,animated: false});
  };

  render() {
    const { type, list, dataSource, types, page, total, paging, url } = this.state;
    const { navigator, index } = this.props;

    let source = dataSource.cloneWithRows(list);
    let temp = types.slice(0);
    let first = temp.splice(0, temp.length / 2);
    let second = temp;
    
    return(
      <ScrollView  style={styles.container}>
      <PageHeader navigator={navigator} index={index} />
      <View style={styles.typeContainer}>
        {first && first.map((item) => {
          let style = [styles.btnText];
          if (item.url == type) {
            return (<TouchableOpacity style={styles.btnStyle}>
              <Text style={[styles.btnText, {color: '#bbb'}]}>{item.title}</Text>
            </TouchableOpacity>);
          }
          return (<TouchableOpacity style={styles.btnStyle} onPress={() => this._controlPressType(item) }>
              <Text style={styles.btnText}>{item.title}</Text>
            </TouchableOpacity>);
        })}
      </View>
      <View style={styles.typeContainer}>
        {second && second.map((item) => {
          let style = [styles.btnText];
          if (item.url == type) {
            return (<TouchableOpacity style={styles.btnStyle}>
              <Text style={[styles.btnText, {color: '#bbb'}]}>{item.title}</Text>
            </TouchableOpacity>);
          }
          return (<TouchableOpacity style={styles.btnStyle} onPress={() => this._controlPressType(item) }>
              <Text style={styles.btnText}>{item.title}</Text>
            </TouchableOpacity>);
        })}
      </View>
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
          <Picker
            style={styles.picker}
            onValueChange={this._onProviderChange}
            selectedValue={url}
            mode="dialog">
              <Picker.Item label={`Blog Truyện`} value={`http://m.blogtruyen.com`} />
              <Picker.Item label={`Ham Truyện`} value={`http://hamtruyen.vn`} />
          </Picker>
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

