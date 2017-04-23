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
  Picker, TextInput } from 'react-native';
import Util from '../../utils/utils';
import CheerioUtil from '../../utils/CheerioUtil';
import DetailManga from './DetailManga';
import PageHeader from '../../components/Common/PageHeader';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default class SearchManga extends Component{
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  
    this.state = {
      dataSource,
      search: '',
      list: [],
      url: '',
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
    this.setState({
      url: data.host
    });
    this._startLoad(data.search, data.host);   
  }

  componentDidMount() {
  }

  _startLoad(search, host) {
    
    let path = '';

    switch(host) {
      case 'http://m.blogtruyen.com':
        path = 'http://m.blogtruyen.com/timkiem?keyword=' + search;
      break;
      case 'http://hamtruyen.vn':
        path = 'http://hamtruyen.vn/@SEARCH@/search.html';
        path = path.replace('@SEARCH@', search);
      break;
    }
    axios({method: 'GET', url: path, params: { }})
      .then(async (response) => {
        let list = CheerioUtil.getSearchManga(response.data, host);

        this.setState({
          list
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
      title: '',
      index: index + 1,
      display: false,
      component: DetailManga,
      data: {manga, url }
    });
  }

  _handleSearchChange = (event) => {
    let search = event.nativeEvent.text;
    this.setState({
        search
      });
  };

  _searchManga() {
    const { url, search } = this.state;
    this.setState({
      search
    });
    this._startLoad(search, url);
  }

  render() {
    const { list, dataSource, search } = this.state;
    const { navigator, index } = this.props;

    let source = dataSource.cloneWithRows(list);
    
    return(
      <ScrollView style={styles.container}>
        <PageHeader navigator={navigator} index={index} />
        <View style={styles.faceContainer}>
          <TextInput defaultValue={search} value={search}  ref='searchBox' defaultValue={''} style={styles.inputText} onChange={this._handleSearchChange}/>
          <TouchableOpacity style={styles.btnStyle} onPress={() => this._searchManga() }>
            <MCIcon name='magnify' color='#60B644' size={32}/>
          </TouchableOpacity>
        </View>
        <ListView
          style={styles.recordList}
          renderHeader = {() => <View style={{height: 10, backgroundColor: '#f5f5f5'}} />}
          enableEmptySections = {true} 
          dataSource={source}
          renderRow={(rowData) => 
          <TouchableOpacity underlayColor={'#bbb'} onPress={() => {
              this._openManga(this.rowID, rowData);
            }}>
            <View style={styles.recordItem}>
              <Text style={styles.recordItemTitle}>{rowData.title}</Text>
            </View>
          </TouchableOpacity>
          }/>
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
    height: Util.size.height - 40 - 50 - 80,
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
    textAlign: 'left',
    paddingLeft: 20,
    color: '#777'
  },
  btnStyle: {
    width: 40,
    height: 40,
    borderRadius: 35,
    backgroundColor: 'transparent',
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
  inputText: {
    marginLeft: 10,
    height: 40,
    width: Util.size.width - 120 - 40,
    color: '#363636',
  },
});

