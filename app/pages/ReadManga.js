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
  TouchableWithoutFeedback, 
  Picker, 
  BackAndroid } from 'react-native';
import FitImage from 'react-native-fit-image';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Util from '../utils/utils';
import CheerioUtil from '../utils/CheerioUtil';
import StorageUtil from '../utils/StorageUtil';
import axios from 'axios';

export default class ReadManga extends Component{
  constructor() {
    super();
    this.state = {
      chaps: [],
      pages: [],
      current: '',
      next: '',
      back: '',
      options: { zoom: 15 },
      host: 'http://m.blogtruyen.com'
    };
  }

  componentWillMount() {
    const { data } = this.props;
    this.loadManga({url: data.url, title: data.title});

    BackAndroid.addEventListener('hardwareBackPress', () => {
      const { navigator, index } = this.props;
      if (index > 0) {navigator.pop()};
      BackAndroid.removeEventListener('hardwareBackPress');
      return true;
    });
  }

  componentDidMount() {
  }

  async loadManga(chap) {
    const { host, pages, current, chaps } = this.state;
    const { data } = this.props;

    await StorageUtil.saveHistory(data.id, {title: chap.title, url: chap.url});

    let url =  host + chap.url;

    if (!pages[chap.url]) {
      this.setState({
        current: chap.url,
        title: chap.title
      });

      axios({method: 'GET', url, params: { }})
      .then(async (response) => {
        const { current } = this.state;
        let read = CheerioUtil.getReadManga(response.data);

        let position = -1;
        read.listChaps.forEach((item, index) => {
          if(item.url == current) {
            position = index;
            return;
          }
        });

        let tempPages = Object.assign({}, pages);
        if (!pages[current]) {
          tempPages[current] = read.listPages;
        }
        this.setState({
          pages: tempPages,
          chaps: read.listChaps,
          next: read.listChaps[position - 1],
          back: read.listChaps[position + 1]
        });
      })
      .catch((error) => {
        console.warn(error);
      });
    } else {
      let position = -1;
      chaps.forEach((item, index) => {
        if(item.url == current) {
          position = index;
          return;
        }
      });

      this.setState({
        current: chap.url,
        title: chap.title,
        next: chaps[position - 1],
        back: chaps[position + 1]
      });
    }
  }

  _controlPress(action) {
    const { back, next, current } = this.state;

    switch(action) {
      case 'back':
        if (back && back != current) {
          this.loadManga(back);
        }
      break;
      case 'next':
        if (next && next != current) {
          this.loadManga(next);
        }
      break;
      case 'save':
        if (next && next != current) {
          this.loadManga(next);
        }
      break;
    }
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

      this.loadManga({title, url: value});
    }
  };


  render() {
      const { pages, host, current, options, title, chaps } = this.state;
      let list = pages[current];
    return(
      <View style={styles.container}>
        <View style={styles.faceContainer}>
          <Text style={styles.faceIntroduce}>{title}</Text>
          <TouchableHighlight style={styles.btnStyle} onPress={() => this._controlPress('save') }>
            <MCIcon name='content-save' color='#60B644' size={32}/>
          </TouchableHighlight>
          <TouchableHighlight style={styles.btnStyle} onPress={() => this._controlPress('back') }>
            <Icon name='md-arrow-round-back' color='#60B644' size={32}/>
          </TouchableHighlight>
          <Picker
            style={styles.picker}
            onValueChange={this._onValueChange}
            selectedValue={current}
            mode="dialog">
            {chaps && chaps.map((chap) => (<Picker.Item label={`${chap.title}`} value={`${chap.url}`} />))}
          </Picker>
          <TouchableHighlight style={styles.btnStyle} onPress={() => this._controlPress('next') }>
            <Icon name='md-arrow-round-forward' color='#60B644' size={32}/>
          </TouchableHighlight>
        </View>
        <ScrollView style={styles.recordList}>
          {list && list.map((img) => {
            //return (<Image resizeMode='stretch' style={styles.recordItem} source={{uri: img}}/>);
            return (<View style={[styles.recordItem, { paddingLeft: options.zoom, paddingRight: options.zoom }]}><FitImage
              resizeMode='stretch'
              source={{uri: img}}
            /></View>);
          })}
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
    flex: 1,
  },
  recordList: {
    width: Util.size.width,
    height: Util.size.height - 70 - 65,
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
    justifyContent: 'center'
  },
  picker: {
    width: 100,
    height: 40
  },
});

