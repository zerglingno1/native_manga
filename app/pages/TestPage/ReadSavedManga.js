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
  TouchableWithoutFeedback, 
  Picker, 
  BackAndroid, 
  WebView } from 'react-native';
import FitImage from 'react-native-fit-image';
import ActionButton from 'react-native-action-button';
import PageHeader from '../../components/Common/PageHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Util from '../../utils/utils';
import CheerioUtil from '../../utils/CheerioUtil';
import StorageUtil from '../../utils/StorageUtil';
import FileUtil from '../../utils/FileUtil';
import axios from 'axios';

export default class ReadSavedManga extends Component{
  constructor() {
    super();
    this.state = {
      chaps: [],
      pages: [],
      current: '',
      next: '',
      back: '',
      options: { zoom: 15 },
      host: 'http://m.blogtruyen.com',
      WebView
    };
  }

  componentWillMount() {
    this.loadManga();

    BackAndroid.addEventListener('hardwareBackPress', () => {
      const { navigator, index } = this.props;
      if (index > 0) {navigator.pop()};
      BackAndroid.removeEventListener('hardwareBackPress');
      return true;
    });
  }

  componentDidMount() {
  }

  async loadManga() {
    const { data } = this.props;

    let listChap = [];
    let listPage = {};
    let current = '';
    for (let key in data.chaps) {
      let item = data.chaps[key];
      listChap.push({title: item.title, url: key});
      listPage[key] = item.pages;
      current = key;
    }

    this.setState({
      chaps: listChap,
      pages: listPage,
      current
    });
  }

  _onValueChange = (value) => {
    const { current, chaps } = this.state;

    if (value && current != value) {
      let title = '';
      chaps.forEach((chap) => {
        if(chap.url == value) {
          title = chap.title;
          return;
        }
      });

      this.setState({
        title,
        current: value
      });
    }
  };


  render() {
      const { pages, current, options, title, chaps } = this.state;
      const { navigator, index } = this.props;

      let source = {html: (pages[current]) ? pages[current] : ''};
    return(
      <View style={styles.container}>
        <PageHeader navigator={navigator} index={index} />
        <View style={styles.faceContainer}>
          <Text style={styles.faceIntroduce}>{title}</Text>
          <Picker
            style={styles.picker}
            onValueChange={this._onValueChange}
            selectedValue={current}
            mode="dialog">
            {chaps && chaps.map((chap) => (<Picker.Item label={`${chap.title}`} value={`${chap.url}`} />))}
          </Picker>
        </View>
        <ScrollView style={styles.recordList} scrollsToTop={true}>
          <WebView
            ref='web'
            style={styles.webView}
            automaticallyAdjustContentInsets={false}
            source={source}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            startInLoadingState={true}
            scalesPageToFit={true}
          />
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
    paddingTop: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd',
    height: 60,
    flexDirection: 'row'
  },
  faceIntroduce: {
    width: Util.size.width * 50 / 100,
    fontSize: 20,
    fontWeight: '200',
    color: '#222',
    flex: 2,
    marginTop: 8,
  },
  webView: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    height: Util.size.height - 70 - 40,
  },
  recordList: {
    width: Util.size.width,
    height: Util.size.height - 70 - 40,
    backgroundColor: '#bbb'
  },
  recordItem: {
    paddingBottom: 15, paddingTop: 15
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
    flex: 1,
  },
  picker: {
    width: 100,
    height: 40,
    marginTop: 5,
    flex: 1,
  },
});

